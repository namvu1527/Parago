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
            id: string;
            name: string;
            avatarUrl: string | null;
        } | undefined;
    }[]>;
    getMessages(req: any, id: string, skip?: string, take?: string): Promise<{
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
}
