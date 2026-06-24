import { ChatbotService } from './chatbot.service';
export declare class ChatbotController {
    private readonly chatbotService;
    constructor(chatbotService: ChatbotService);
    sendMessage(req: any, content: string): Promise<{
        success: boolean;
        data: {
            id: string;
            createdAt: Date;
            userId: string;
            role: import(".prisma/client").$Enums.ChatRole;
            content: string;
        };
    }>;
    getHistory(req: any): Promise<{
        success: boolean;
        data: {
            id: string;
            createdAt: Date;
            userId: string;
            role: import(".prisma/client").$Enums.ChatRole;
            content: string;
        }[];
    }>;
}
