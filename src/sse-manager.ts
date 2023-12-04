import { Op } from "sequelize";
import { Message, Subscription } from "./sequelize";

export default class SseManager {
    public lastMessageSent: Record<string, number> = {};

    // Open a new subscription
    public async createSubscription (): Promise<Subscription> {
        return await Subscription.create();
    }

    // Close subscription
    public async deleteSubscription (subscriptionId: string): Promise<void> {
        await Subscription.destroy({
            where: {
                id: subscriptionId
            }
        });
        delete this.lastMessageSent[subscriptionId];
    }

    // Poll DB messages for the subscription
    public async getSubscriptionMessages (subscriptionId: string): Promise<Message[] | null> {
        const lastIndex = this.lastMessageSent[subscriptionId] || 0;
        const subs = await Message.findAll({
            where: {
                id: {
                    [Op.gt]: lastIndex
                },
                subscriptionId,
            },
            order: [[
                'createdAt', 'DESC'
            ]],
            limit: 10
        });
        if (subs.length) {
            const latestMessage = subs[subs.length - 1];
            this.lastMessageSent[subscriptionId] = latestMessage.get('id');
            return subs;
        }
        return null;
    }
}