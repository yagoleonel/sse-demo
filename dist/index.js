"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const sse_manager_1 = __importDefault(require("./sse-manager"));
const crypto_1 = require("crypto");
const app = (0, express_1.default)();
// Serve static files (like index.html) from the 'public' directory
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// JSON body parser
app.use(express_1.default.json());
// Root path - serves index.html
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'public', 'index.html'));
});
const sseManager = new sse_manager_1.default();
app.get('/sse', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Set content type for SSE
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    });
    const subscriptionId = (0, crypto_1.randomUUID)();
    res.write(`event:subscribed\ndata:${JSON.stringify({ subscriptionId })}\n\n`);
    return sseManager.addClient(subscriptionId, { req, res });
}));
app.post('/message', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text, subscriptionId } = req.body;
        console.log('AHAHAHAHA', { subscriptionId, text });
        yield sseManager.postMessage(subscriptionId, text);
        // Send a 201 (Created) response with the created user data
        return res.status(201).json({
            status: 'success',
            message: 'Message created successfully',
        });
    }
    catch (error) {
        console.error('Error creating message:', error);
        // Handle errors and send an appropriate response
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    }
}));
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
