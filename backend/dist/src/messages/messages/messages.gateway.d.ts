import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { MessagesService } from '../messages.service';
import { PrismaService } from '../../prisma/prisma.service';
export declare class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly jwtService;
    private readonly messagesService;
    private readonly prisma;
    server: Server;
    private rateLimits;
    private userSockets;
    constructor(jwtService: JwtService, messagesService: MessagesService, prisma: PrismaService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    addUserToRoom(userId: string, roomName: string): void;
    handleMessage(client: Socket, payload: {
        conversationId: string;
        content: string;
        type?: string;
    }): Promise<void>;
    handleMarkRead(client: Socket, payload: {
        conversationId: string;
    }): Promise<void>;
    handleJoinRoom(client: Socket, payload: {
        conversationId: string;
    }): void;
    handleLeaveRoom(client: Socket, payload: {
        conversationId: string;
    }): void;
}
