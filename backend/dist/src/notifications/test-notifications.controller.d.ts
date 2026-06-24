import { NotificationsService } from './notifications.service';
import { NotificationType } from '@prisma/client';
export declare class TestNotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    testEmit(body: {
        userId: string;
        type: NotificationType;
    }): Promise<{
        success: boolean;
    }>;
}
