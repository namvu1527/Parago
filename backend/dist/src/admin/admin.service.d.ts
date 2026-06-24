import { PrismaService } from '../prisma/prisma.service';
import { SystemRole } from '@prisma/client';
export declare class AdminService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getUsers(page?: number, limit?: number, search?: string): Promise<{
        data: {
            name: string;
            id: string;
            email: string;
            university: string;
            avatarUrl: string | null;
            verified: boolean;
            systemRole: import(".prisma/client").$Enums.SystemRole | null;
            isBanned: boolean;
            createdAt: Date;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    verifyUser(id: string): Promise<{
        name: string;
        id: string;
        verified: boolean;
    }>;
    banUser(id: string, reason: string): Promise<{
        name: string;
        id: string;
        isBanned: boolean;
        banReason: string | null;
    }>;
    unbanUser(id: string): Promise<{
        name: string;
        id: string;
        isBanned: boolean;
    }>;
    changeUserRole(id: string, role: SystemRole | null): Promise<{
        name: string;
        id: string;
        systemRole: import(".prisma/client").$Enums.SystemRole | null;
    }>;
    getRides(page?: number, limit?: number, status?: string): Promise<{
        data: ({
            driver: {
                name: string;
                id: string;
                email: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            pickupLocation: string;
            pickupLat: number | null;
            pickupLng: number | null;
            destinationLocation: string;
            destLat: number | null;
            destLng: number | null;
            distance: number | null;
            duration: number | null;
            departureAt: Date;
            seatsAvailable: number;
            price: import("@prisma/client/runtime/library").Decimal;
            vehicleType: string;
            vehicleName: string | null;
            genderPreference: string | null;
            mode: import(".prisma/client").$Enums.Mode;
            status: import(".prisma/client").$Enums.RideStatus;
            notes: string | null;
            driverId: string;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    cancelRide(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        pickupLocation: string;
        pickupLat: number | null;
        pickupLng: number | null;
        destinationLocation: string;
        destLat: number | null;
        destLng: number | null;
        distance: number | null;
        duration: number | null;
        departureAt: Date;
        seatsAvailable: number;
        price: import("@prisma/client/runtime/library").Decimal;
        vehicleType: string;
        vehicleName: string | null;
        genderPreference: string | null;
        mode: import(".prisma/client").$Enums.Mode;
        status: import(".prisma/client").$Enums.RideStatus;
        notes: string | null;
        driverId: string;
    }>;
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
    resolveSOS(id: string, status: 'RESOLVED' | 'FALSE_ALARM', adminId: string): Promise<{
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
    getDashboardStats(): Promise<{
        totalUsers: number;
        activeRides: number;
        newUsersToday: number;
        revenue: number;
    }>;
}
