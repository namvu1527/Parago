import { PrismaService } from '../prisma/prisma.service';
import { CreateRideDto } from './dto/create-ride.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { MessagesService } from '../messages/messages.service';
export declare class RidesService {
    private readonly prisma;
    private readonly notificationsService;
    private readonly messagesService;
    constructor(prisma: PrismaService, notificationsService: NotificationsService, messagesService: MessagesService);
    createRide(driverId: string, dto: CreateRideDto): Promise<{
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
    findAll(query?: {
        mode?: string;
        status?: string;
        date?: string;
    }): Promise<{
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
    } | null>;
    cancelRide(rideId: string, userId: string, systemRole: string): Promise<{
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
    deleteRide(rideId: string, userId: string, systemRole: string): Promise<{
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
    requestJoin(rideId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.PassengerStatus;
        rideId: string;
        passengerId: string;
    }>;
    updatePassengerStatus(rideId: string, ridePassengerId: string, driverId: string, action: 'ACCEPT' | 'REJECT'): Promise<{
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.PassengerStatus;
        rideId: string;
        passengerId: string;
    }>;
    cancelJoinRequest(rideId: string, userId: string): Promise<{
        success: boolean;
    }>;
    getMyRides(userId: string, role: string): Promise<({
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
}
