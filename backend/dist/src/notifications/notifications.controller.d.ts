import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    getNotifications(req: any): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        message: string;
        type: import(".prisma/client").$Enums.NotificationType;
        isRead: boolean;
        link: string | null;
        userId: string;
    }[]>;
    markAllAsRead(req: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
    markAsRead(id: string, req: any): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        message: string;
        type: import(".prisma/client").$Enums.NotificationType;
        isRead: boolean;
        link: string | null;
        userId: string;
    }>;
}
