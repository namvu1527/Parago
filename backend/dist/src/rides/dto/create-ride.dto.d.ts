import { Mode } from '@prisma/client';
export declare class CreateRideDto {
    pickupLocation: string;
    pickupLat?: number;
    pickupLng?: number;
    destinationLocation: string;
    destLat?: number;
    destLng?: number;
    distance?: number;
    duration?: number;
    departureAt: string;
    seatsAvailable: number;
    price: number;
    vehicleType: string;
    vehicleName?: string;
    genderPreference?: string;
    notes?: string;
    mode: Mode;
}
