import { MessagesService } from './messages.service';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    createConversation(req: any, body: {
        targetUserId: string;
        rideId?: string;
    }): Promise<{
        id: string;
    }>;
    getConversations(req: any): Promise<{
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
    getMessages(req: any, id: string, skip?: string, take?: string): Promise<{
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
}
