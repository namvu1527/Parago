import { PrismaService } from '../prisma/prisma.service';
import { NotificationsGateway } from './notifications.gateway';
import { NotificationType } from '@prisma/client';
export declare class NotificationsService {
    private readonly prisma;
    private readonly notificationsGateway;
    constructor(prisma: PrismaService, notificationsGateway: NotificationsGateway);
    getNotifications(userId: string): Promise<{
        message: string;
        id: string;
        createdAt: Date;
        type: import(".prisma/client").$Enums.NotificationType;
        isRead: boolean;
        userId: string;
        title: string;
        link: string | null;
    }[]>;
    markAsRead(id: string, userId: string): Promise<{
        message: string;
        id: string;
        createdAt: Date;
        type: import(".prisma/client").$Enums.NotificationType;
        isRead: boolean;
        userId: string;
        title: string;
        link: string | null;
    }>;
    markAllAsRead(userId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
    createNotification(userId: string, title: string, message: string, type: NotificationType, link?: string): Promise<{
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
