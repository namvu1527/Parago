import { PrismaService } from '../prisma/prisma.service';
import { NotificationsGateway } from './notifications.gateway';
import { NotificationType } from '@prisma/client';
export declare class NotificationsService {
    private readonly prisma;
    private readonly notificationsGateway;
    constructor(prisma: PrismaService, notificationsGateway: NotificationsGateway);
    getNotifications(userId: string): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        message: string;
        type: import(".prisma/client").$Enums.NotificationType;
        isRead: boolean;
        link: string | null;
        userId: string;
    }[]>;
    markAsRead(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        message: string;
        type: import(".prisma/client").$Enums.NotificationType;
        isRead: boolean;
        link: string | null;
        userId: string;
    }>;
    markAllAsRead(userId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
    createNotification(userId: string, title: string, message: string, type: NotificationType, link?: string): Promise<{
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
