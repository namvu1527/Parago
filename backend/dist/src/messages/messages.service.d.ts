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
            id: string;
            name: string;
            avatarUrl: string | null;
        } | undefined;
    }[]>;
    getMessages(conversationId: string, userId: string, skip?: number, take?: number): Promise<{
        conversation: {
            otherUser: {
                id: string;
                name: string;
                avatarUrl: string | null;
            };
            participants: ({
                user: {
                    id: string;
                    name: string;
                    avatarUrl: string | null;
                };
            } & {
                userId: string;
                conversationId: string;
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
                id: string;
                name: string;
                avatarUrl: string | null;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            type: string;
            isRead: boolean;
            text: string | null;
            imageUrl: string | null;
            conversationId: string;
            senderId: string | null;
        })[];
    }>;
    saveMessage(conversationId: string, senderId: string, text: string, type?: string): Promise<{
        sender: {
            id: string;
            name: string;
            avatarUrl: string | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        type: string;
        isRead: boolean;
        text: string | null;
        imageUrl: string | null;
        conversationId: string;
        senderId: string | null;
    }>;
    markAsRead(conversationId: string, userId: string): Promise<void>;
}
