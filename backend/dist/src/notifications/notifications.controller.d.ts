import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    getNotifications(req: any): Promise<{
        message: string;
        id: string;
        createdAt: Date;
        type: import(".prisma/client").$Enums.NotificationType;
        isRead: boolean;
        userId: string;
        title: string;
        link: string | null;
    }[]>;
    markAllAsRead(req: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
    markAsRead(id: string, req: any): Promise<{
        message: string;
        id: string;
        createdAt: Date;
        type: import(".prisma/client").$Enums.NotificationType;
        isRead: boolean;
        userId: string;
        title: string;
        link: string | null;
    }>;
}
