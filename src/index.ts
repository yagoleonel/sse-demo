import express, { Request, Response } from 'express';
import http from 'http';
import path from 'path';
import SseManager from './sse-manager';
import { randomUUID } from 'crypto';

const app = express();

// Serve static files (like index.html) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
// JSON body parser
app.use(express.json());

// Root path - serves index.html
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const sseManager = new SseManager();

app.get('/sse', async (req: Request, res: Response) => {
  // Set content type for SSE
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  })

  const subscriptionId = randomUUID();

  res.write(`event:subscribed\ndata:${JSON.stringify({ subscriptionId })}\n\n`);

  return sseManager.addClient(subscriptionId, { req, res });
});

app.post('/message', async (req, res) => {
  try {
    const { text, subscriptionId } = req.body;

    console.log('_', { subscriptionId, text })

    await sseManager.postMessage(subscriptionId, text);

    // Send a 201 (Created) response with the created user data
    return res.status(201).json({
      status: 'success',
      message: 'Message created successfully',
    });
  } catch (error) {
    console.error('Error creating message:', error);
    // Handle errors and send an appropriate response
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

