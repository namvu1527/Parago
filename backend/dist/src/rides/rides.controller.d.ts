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
            name: string;
            id: string;
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
        driver: {
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
                name: string;
                id: string;
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
            name: string;
            id: string;
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
}
