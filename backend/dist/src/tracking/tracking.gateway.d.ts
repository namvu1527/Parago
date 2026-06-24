import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TrackingService } from './tracking.service';
import { JwtService } from '@nestjs/jwt';
export declare class TrackingGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private trackingService;
    private jwtService;
    server: Server;
    private readonly logger;
    private connectedClients;
    constructor(trackingService: TrackingService, jwtService: JwtService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    handleJoinRide(client: Socket, data: {
        rideId: string;
    }): void;
    handleLeaveRide(client: Socket, data: {
        rideId: string;
    }): void;
    handleUpdateLocation(client: Socket, data: {
        rideId: string;
        lat: number;
        lng: number;
    }): Promise<void>;
    handleSOS(client: Socket, data: {
        rideId: string;
        lat: number;
        lng: number;
    }): Promise<void>;
}
