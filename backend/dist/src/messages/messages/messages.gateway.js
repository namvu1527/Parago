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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const jwt_1 = require("@nestjs/jwt");
const messages_service_1 = require("../messages.service");
const prisma_service_1 = require("../../prisma/prisma.service");
let MessagesGateway = class MessagesGateway {
    jwtService;
    messagesService;
    prisma;
    server;
    rateLimits = new Map();
    userSockets = new Map();
    constructor(jwtService, messagesService, prisma) {
        this.jwtService = jwtService;
        this.messagesService = messagesService;
        this.prisma = prisma;
    }
    async handleConnection(client) {
        try {
            let token = client.handshake.auth?.token;
            if (!token && client.handshake.query?.token) {
                token = client.handshake.query.token;
            }
            if (!token) {
                client.disconnect();
                return;
            }
            const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET || 'secret' });
            client.data.user = decoded;
            const conversations = await this.prisma.conversationParticipant.findMany({
                where: { userId: decoded.sub }
            });
            const rooms = conversations.map(c => `conversation_${c.conversationId}`);
            if (rooms.length > 0) {
                client.join(rooms);
                client.emit('joinedRooms', rooms);
            }
            if (!this.userSockets.has(decoded.sub)) {
                this.userSockets.set(decoded.sub, new Set());
            }
            this.userSockets.get(decoded.sub).add(client.id);
            console.log(`[MessagesGateway] User ${decoded.sub} connected to ${rooms.length} conversation rooms`);
        }
        catch (err) {
            console.error(`[MessagesGateway] Auth failed: ${err.message}`);
            client.disconnect();
        }
    }
    handleDisconnect(client) {
        const userId = client.data.user?.sub;
        if (userId && this.userSockets.has(userId)) {
            this.userSockets.get(userId).delete(client.id);
            if (this.userSockets.get(userId).size === 0) {
                this.userSockets.delete(userId);
            }
        }
    }
    addUserToRoom(userId, roomName) {
        const socketIds = this.userSockets.get(userId);
        if (socketIds) {
            socketIds.forEach(socketId => {
                const socket = this.server.sockets.sockets.get(socketId);
                if (socket) {
                    socket.join(roomName);
                    console.log(`[MessagesGateway] User ${userId} (Socket ${socketId}) joined dynamically to ${roomName}`);
                }
            });
        }
    }
    async handleMessage(client, payload) {
        const userId = client.data.user?.sub;
        if (!userId)
            return;
        const now = Date.now();
        const limitRecord = this.rateLimits.get(userId) || { count: 0, resetAt: now + 1000 };
        if (now > limitRecord.resetAt) {
            limitRecord.count = 1;
            limitRecord.resetAt = now + 1000;
        }
        else {
            limitRecord.count++;
        }
        this.rateLimits.set(userId, limitRecord);
        if (limitRecord.count > 5) {
            client.emit('error', { message: 'Bạn gửi tin nhắn quá nhanh. Vui lòng thử lại sau.' });
            return;
        }
        try {
            const message = await this.messagesService.saveMessage(payload.conversationId, userId, payload.content, payload.type || 'text');
            this.server.to(`conversation_${payload.conversationId}`).emit('newMessage', message);
        }
        catch (err) {
            console.error(err);
            client.emit('error', { message: 'Lỗi khi gửi tin nhắn' });
        }
    }
    async handleMarkRead(client, payload) {
        const userId = client.data.user?.sub;
        if (!userId)
            return;
        try {
            await this.messagesService.markAsRead(payload.conversationId, userId);
            this.server.to(`conversation_${payload.conversationId}`).emit('messagesRead', {
                conversationId: payload.conversationId,
                readBy: userId
            });
        }
        catch (err) {
            console.error(err);
        }
    }
    handleJoinRoom(client, payload) {
        const roomName = `conversation_${payload.conversationId}`;
        client.join(roomName);
        client.emit('roomJoined', { conversationId: payload.conversationId });
        console.log(`[MessagesGateway] Client ${client.id} joined ${roomName}`);
    }
    handleLeaveRoom(client, payload) {
        const roomName = `conversation_${payload.conversationId}`;
        client.leave(roomName);
        console.log(`[MessagesGateway] Client ${client.id} left ${roomName}`);
    }
};
exports.MessagesGateway = MessagesGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MessagesGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('markRead'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "handleMarkRead", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinRoom'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], MessagesGateway.prototype, "handleJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leaveRoom'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], MessagesGateway.prototype, "handleLeaveRoom", null);
exports.MessagesGateway = MessagesGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        namespace: 'messages',
        cors: { origin: true, credentials: true },
    }),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        messages_service_1.MessagesService,
        prisma_service_1.PrismaService])
], MessagesGateway);
//# sourceMappingURL=messages.gateway.js.map