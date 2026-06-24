import { AdminService } from '../admin.service';
export declare class AdminSOSController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getActiveSOS(): Promise<({
        ride: {
            pickupLocation: string;
            destinationLocation: string;
            driver: {
                name: string;
                phone: string | null;
            };
        };
        triggeredByUser: {
            name: string;
            id: string;
            phone: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.SOSAlertStatus;
        rideId: string;
        lat: number;
        lng: number;
        resolvedAt: Date | null;
        resolvedByAdminId: string | null;
        triggeredByUserId: string;
    })[]>;
    resolveSOS(id: string, status: 'RESOLVED' | 'FALSE_ALARM', req: any): Promise<{
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.SOSAlertStatus;
        rideId: string;
        lat: number;
        lng: number;
        resolvedAt: Date | null;
        resolvedByAdminId: string | null;
        triggeredByUserId: string;
    }>;
}
