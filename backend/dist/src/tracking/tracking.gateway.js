"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var TrackingGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackingGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const tracking_service_1 = require("./tracking.service");
const jwt_1 = require("@nestjs/jwt");
let TrackingGateway = TrackingGateway_1 = class TrackingGateway {
    trackingService;
    jwtService;
    server;
    logger = new common_1.Logger(TrackingGateway_1.name);
    connectedClients = new Map();
    constructor(trackingService, jwtService) {
        this.trackingService = trackingService;
        this.jwtService = jwtService;
    }
    async handleConnection(client) {
        try {
            const token = client.handshake.auth.token || client.handshake.headers.authorization?.split(' ')[1];
            if (!token) {
                client.disconnect();
                return;
            }
            const payload = await this.jwtService.verifyAsync(token);
            if (!payload || !payload.sub) {
                client.disconnect();
                return;
            }
            this.connectedClients.set(client.id, payload.sub);
            this.logger.log(`Client connected: ${client.id} (User: ${payload.sub})`);
        }
        catch (e) {
            this.logger.error('Connection error', e);
            client.disconnect();
        }
    }
    handleDisconnect(client) {
        this.connectedClients.delete(client.id);
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    handleJoinRide(client, data) {
        if (!data.rideId)
            return;
        client.join(`ride_${data.rideId}`);
        this.logger.log(`Socket ${client.id} joined room: ride_${data.rideId}`);
        this.trackingService.getRideLocations(data.rideId).then(locations => {
            client.emit('locationsUpdate', locations);
        });
    }
    handleLeaveRide(client, data) {
        if (!data.rideId)
            return;
        client.leave(`ride_${data.rideId}`);
        this.logger.log(`Socket ${client.id} left room: ride_${data.rideId}`);
    }
    async handleUpdateLocation(client, data) {
        const userId = this.connectedClients.get(client.id);
        if (!userId || !data.rideId || !data.lat || !data.lng)
            return;
        await this.trackingService.setLocation(userId, data.rideId, data.lat, data.lng);
        const locations = await this.trackingService.getRideLocations(data.rideId);
        this.server.to(`ride_${data.rideId}`).emit('locationsUpdate', locations);
    }
    async handleSOS(client, data) {
        const userId = this.connectedClients.get(client.id);
        if (!userId || !data.rideId || !data.lat || !data.lng)
            return;
        const alert = await this.trackingService.triggerSOS(data.rideId, userId, data.lat, data.lng);
        this.server.to(`ride_${data.rideId}`).emit('sosAlert', alert);
        this.server.emit('admin_sosAlert', alert);
    }
};
exports.TrackingGateway = TrackingGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], TrackingGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinRide'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], TrackingGateway.prototype, "handleJoinRide", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leaveRide'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], TrackingGateway.prototype, "handleLeaveRide", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('updateLocation'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], TrackingGateway.prototype, "handleUpdateLocation", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('triggerSOS'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], TrackingGateway.prototype, "handleSOS", null);
exports.TrackingGateway = TrackingGateway = TrackingGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        namespace: '/tracking',
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [tracking_service_1.TrackingService,
        jwt_1.JwtService])
], TrackingGateway);
//# sourceMappingURL=tracking.gateway.js.map