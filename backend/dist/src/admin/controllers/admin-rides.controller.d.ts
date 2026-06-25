import { AdminService } from '../admin.service';
export declare class AdminRidesController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getRides(page: string, limit: string, status: string): Promise<{
        data: ({
            driver: {
                id: string;
                name: string;
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
}
