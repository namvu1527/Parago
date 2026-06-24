import { PrismaService } from '../prisma/prisma.service';
export declare class MessagesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createConversation(userId: string, targetUserId: string, rideId?: string): Promise<{
        id: string;
    }>;
    getConversations(userId: string): Promise<{
        id: string;
        rideId: string | null;
        lastMessageAt: Date | null;
        lastMessageText: string | null;
        createdAt: Date;
        unreadCount: number;
        otherUser: {
            name: string;
            id: string;
            avatarUrl: string | null;
        } | undefined;
    }[]>;
    getMessages(conversationId: string, userId: string, skip?: number, take?: number): Promise<{
        conversation: {
            otherUser: {
                name: string;
                id: string;
                avatarUrl: string | null;
            };
            participants: ({
                user: {
                    name: string;
                    id: string;
                    avatarUrl: string | null;
                };
            } & {
                conversationId: string;
                userId: string;
                joinedAt: Date;
            })[];
            id: string;
            createdAt: Date;
            rideId: string | null;
            lastMessageAt: Date | null;
            lastMessageText: string | null;
        };
        messages: ({
            sender: {
                name: string;
                id: string;
                avatarUrl: string | null;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            text: string | null;
            imageUrl: string | null;
            type: string;
            isRead: boolean;
            conversationId: string;
            senderId: string | null;
        })[];
    }>;
    saveMessage(conversationId: string, senderId: string, text: string, type?: string): Promise<{
        sender: {
            name: string;
            id: string;
            avatarUrl: string | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        text: string | null;
        imageUrl: string | null;
        type: string;
        isRead: boolean;
        conversationId: string;
        senderId: string | null;
    }>;
    markAsRead(conversationId: string, userId: string): Promise<void>;
}
