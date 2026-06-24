import { PrismaService } from '../prisma/prisma.service';
export declare class ChatbotService {
    private prisma;
    private readonly logger;
    private aiClient;
    constructor(prisma: PrismaService);
    private getSystemInstruction;
    handleUserMessage(userId: string, content: string): Promise<{
        success: boolean;
        data: {
            id: string;
            createdAt: Date;
            userId: string;
            role: import(".prisma/client").$Enums.ChatRole;
            content: string;
        };
    }>;
    getHistory(userId: string): Promise<{
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
