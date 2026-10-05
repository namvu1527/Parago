import { RidesService } from './rides.service';
import { CreateRideDto } from './dto/create-ride.dto';
export declare class RidesController {
    private readonly ridesService;
    constructor(ridesService: RidesService);
    create(req: any, createRideDto: CreateRideDto): Promise<{
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
    findAll(query: any): Promise<{
        totalSeats: number;
        seatsAvailable: number;
        passengers: {
            id: string;
        }[];
        driver: {
            id: string;
            name: string;
            avatarUrl: string | null;
            isPremium: boolean;
            rating: number;
            verified: boolean;
        };
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
        price: import("@prisma/client/runtime/library").Decimal;
        vehicleType: string;
        vehicleName: string | null;
        genderPreference: string | null;
        mode: import(".prisma/client").$Enums.Mode;
        status: import(".prisma/client").$Enums.RideStatus;
        notes: string | null;
        driverId: string;
    }[]>;
    getMyRides(req: any, role: string): Promise<({
        passengers: ({
            passenger: {
                name: string;
                avatarUrl: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            status: import(".prisma/client").$Enums.PassengerStatus;
            rideId: string;
            passengerId: string;
        })[];
        reviews: {
            revieweeId: string;
        }[];
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
    })[] | {
        myRequestStatus: import(".prisma/client").$Enums.PassengerStatus;
        requestCreatedAt: Date;
        reviews: {
            revieweeId: string;
        }[];
        driver: {
            id: string;
            name: string;
            avatarUrl: string | null;
        };
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
    }[]>;
    findOne(id: string): Promise<{
        totalSeats: number;
        seatsAvailable: number;
        passengers: ({
            passenger: {
                id: string;
                name: string;
                avatarUrl: string | null;
                rating: number;
            };
        } & {
            id: string;
            createdAt: Date;
            status: import(".prisma/client").$Enums.PassengerStatus;
            rideId: string;
            passengerId: string;
        })[];
        driver: {
            id: string;
            name: string;
            university: string;
            faculty: string;
            avatarUrl: string | null;
            isPremium: boolean;
            rating: number;
            verified: boolean;
        };
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
        price: import("@prisma/client/runtime/library").Decimal;
        vehicleType: string;
        vehicleName: string | null;
        genderPreference: string | null;
        mode: import(".prisma/client").$Enums.Mode;
        status: import(".prisma/client").$Enums.RideStatus;
        notes: string | null;
        driverId: string;
    }>;
    cancel(id: string, req: any): Promise<{
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
    complete(id: string, req: any): Promise<{
        id: string;
        name: string;
        email: string;
        phone: string | null;
        passwordHash: string;
        university: string;
        faculty: string;
        avatarUrl: string | null;
        isDriver: boolean;
        isPremium: boolean;
        ecoPoints: number;
        rating: number;
        totalRides: number;
        trustScore: number;
        verified: boolean;
        refreshTokenHash: string | null;
        systemRole: import(".prisma/client").$Enums.SystemRole | null;
        isBanned: boolean;
        banReason: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | {
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
    remove(id: string, req: any): Promise<{
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
    requestJoin(id: string, req: any): Promise<{
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.PassengerStatus;
        rideId: string;
        passengerId: string;
    }>;
    updatePassengerStatus(id: string, passengerId: string, action: 'ACCEPT' | 'REJECT', req: any): Promise<{
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.PassengerStatus;
        rideId: string;
        passengerId: string;
    }>;
    cancelJoinRequest(id: string, req: any): Promise<{
        success: boolean;
    }>;
    invitePreviousPassenger(rideId: string, passengerId: string, req: any): Promise<{
        success: boolean;
    }>;
    bulkCreateFromSchedules(createBulkDto: any, req: any): Promise<{
        success: boolean;
        count: number;
    }>;
    getSuggestedRidesBySchedules(req: any): Promise<({
        driver: {
            id: string;
            name: string;
            university: string;
            avatarUrl: string | null;
            rating: number;
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
    })[]>;
}
