import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
export interface LocationUpdate {
    userId: string;
    rideId: string;
    lat: number;
    lng: number;
    timestamp: number;
}
export declare class TrackingService implements OnModuleInit, OnModuleDestroy {
    private prisma;
    private readonly logger;
    private redisClient;
    constructor(prisma: PrismaService);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): void;
    setLocation(userId: string, rideId: string, lat: number, lng: number): Promise<void>;
    getRideLocations(rideId: string): Promise<LocationUpdate[]>;
    triggerSOS(rideId: string, userId: string, lat: number, lng: number): Promise<{
        ride: {
            pickupLocation: string;
            destinationLocation: string;
            vehicleName: string | null;
        };
        triggeredByUser: {
            id: string;
            name: string;
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
    }>;
    getActiveSOSAlerts(): Promise<({
        ride: {
            vehicleType: string;
            vehicleName: string | null;
            driver: {
                id: string;
                name: string;
                phone: string | null;
            };
        };
        triggeredByUser: {
            id: string;
            name: string;
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
}
