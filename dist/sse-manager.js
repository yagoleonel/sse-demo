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
Object.defineProperty(exports, "__esModule", { value: true });
class SseManager {
    constructor() {
        this.lastMessageSent = {};
        this.subscriptions = {};
    }
    addClient(subscriptionId, { req, res }) {
        return __awaiter(this, void 0, void 0, function* () {
            req.on('close', () => {
                delete this.subscriptions[subscriptionId];
                res.end();
            });
            this.subscriptions[subscriptionId] = res;
        });
    }
    postMessage(subscriptionId, text) {
        return __awaiter(this, void 0, void 0, function* () {
            this.subscriptions[subscriptionId].write(`event:message\ndata:${JSON.stringify({ text })}\n\n`);
        });
    }
}
exports.default = SseManager;
