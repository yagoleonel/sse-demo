import { Request, Response } from "express";

export default class SseManager {
    public lastMessageSent: Record<string, number> = {};
    private subscriptions: Record<string, Response> = {}

    public async addClient(subscriptionId: string, { req, res }: { req: Request, res: Response }): Promise<void> {
        req.on('close', () => {
            delete this.subscriptions[subscriptionId];
            res.end();
        })
        this.subscriptions[subscriptionId] = res;
    }

    public async postMessage(subscriptionId: string, text: string): Promise<void> {
        this.subscriptions[subscriptionId].write(`event:message\ndata:${JSON.stringify({ text })}\n\n`)
    }
}