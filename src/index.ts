import express, { Request, Response } from 'express';
import http from 'http';
import path from 'path';
import SseManager from './sse-manager';
import { Message } from './sequelize';

const app = express();
const server = http.createServer(app);

// Serve static files (like index.html) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
// JSON body parser
app.use(express.json());

// Root path - serves index.html
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const sseManager = new SseManager();

app.post('/sse/subscribe', async (req, res) => {
  try {
    const subs = await sseManager.createSubscription();
    // Send a 201 (Created) response with the created user data
    return res.status(201).json({
      status: 'success',
      message: 'Subscription created successfully',
      subscriptionId: subs.get('id'),
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    // Handle errors and send an appropriate response
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
});

app.get('/sse/consume', async (req: Request, res: Response) => {
  // Set content type for SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const subscriptionId = req.query.subscriptionId as string;

  let messages;

  do {
    messages = await sseManager.getSubscriptionMessages(subscriptionId);
    if (messages?.length) {
      const message = `event: messages\ndata: ${JSON.stringify({ messages })}\n\n`;
      res.write(message);
    }
  } while (messages)
  res.end();
});

app.post('/message', async (req, res) => {
  try {

    const { text, subscriptionId } = req.body;

    const message = await Message.create({
      text: text,
      subscriptionId: subscriptionId
    });
    // Send a 201 (Created) response with the created user data
    return res.status(201).json({
      status: 'success',
      message: 'Message created successfully',
      id: message.get('id'),
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
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

