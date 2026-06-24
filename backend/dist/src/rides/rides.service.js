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
exports.RidesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const notifications_service_1 = require("../notifications/notifications.service");
const messages_service_1 = require("../messages/messages.service");
let RidesService = class RidesService {
    prisma;
    notificationsService;
    messagesService;
    constructor(prisma, notificationsService, messagesService) {
        this.prisma = prisma;
        this.notificationsService = notificationsService;
        this.messagesService = messagesService;
    }
    async createRide(driverId, dto) {
        return this.prisma.ride.create({
            data: {
                driverId,
                pickupLocation: dto.pickupLocation,
                pickupLat: dto.pickupLat,
                pickupLng: dto.pickupLng,
                destinationLocation: dto.destinationLocation,
                destLat: dto.destLat,
                destLng: dto.destLng,
                distance: dto.distance,
                duration: dto.duration,
                departureAt: new Date(dto.departureAt),
                seatsAvailable: dto.seatsAvailable,
                price: dto.price,
                vehicleType: dto.vehicleType,
                vehicleName: dto.vehicleName,
                genderPreference: dto.genderPreference || "any",
                mode: dto.mode,
                status: 'PENDING',
                notes: dto.notes,
            },
        });
    }
    async findAll(query) {
        const where = {};
        if (query?.mode)
            where.mode = query.mode;
        if (query?.status)
            where.status = query.status;
        if (query?.date) {
            const startOfDay = new Date(query.date);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(query.date);
            endOfDay.setHours(23, 59, 59, 999);
            where.departureAt = { gte: startOfDay, lte: endOfDay };
        }
        console.log('[GET /rides] PRISMA WHERE CLAUSE:', JSON.stringify(where, null, 2));
        const rides = await this.prisma.ride.findMany({
            where,
            orderBy: { departureAt: 'asc' },
            include: {
                driver: {
                    select: {
                        id: true,
                        name: true,
                        avatarUrl: true,
                        rating: true,
                        verified: true,
                        isPremium: true,
                    }
                },
                passengers: {
                    where: { status: 'ACCEPTED' },
                    select: { id: true }
                }
            }
        });
        return rides.map(ride => {
            const acceptedCount = ride.passengers.length;
            return {
                ...ride,
                totalSeats: ride.seatsAvailable,
                seatsAvailable: Math.max(0, ride.seatsAvailable - acceptedCount),
            };
        });
    }
    async findOne(id) {
        const ride = await this.prisma.ride.findUnique({
            where: { id },
            include: {
                driver: {
                    select: {
                        id: true,
                        name: true,
                        avatarUrl: true,
                        rating: true,
                        verified: true,
                        isPremium: true,
                        university: true,
                        faculty: true,
                    }
                },
                passengers: {
                    include: {
                        passenger: {
                            select: {
                                id: true,
                                name: true,
                                avatarUrl: true,
                                rating: true,
                            }
                        }
                    }
                }
            }
        });
        if (!ride)
            return null;
        const acceptedCount = ride.passengers.filter(p => p.status === 'ACCEPTED').length;
        return {
            ...ride,
            totalSeats: ride.seatsAvailable,
            seatsAvailable: Math.max(0, ride.seatsAvailable - acceptedCount),
        };
    }
    async cancelRide(rideId, userId, systemRole) {
        const ride = await this.prisma.ride.findUnique({ where: { id: rideId } });
        if (!ride)
            throw new Error("Ride not found");
        if (ride.driverId !== userId && systemRole !== 'ADMIN') {
            throw new Error("Forbidden");
        }
        return this.prisma.ride.update({
            where: { id: rideId },
            data: { status: 'CANCELLED' }
        });
    }
    async deleteRide(rideId, userId, systemRole) {
        const ride = await this.prisma.ride.findUnique({
            where: { id: rideId },
            include: { passengers: true }
        });
        if (!ride)
            throw new Error("Ride not found");
        if (ride.driverId !== userId && systemRole !== 'ADMIN') {
            throw new Error("Forbidden");
        }
        if (systemRole !== 'ADMIN') {
            const hasAccepted = ride.passengers.some(p => p.status === 'ACCEPTED');
            if (hasAccepted) {
                throw new Error("CONFLICT_ACCEPTED_PASSENGERS");
            }
        }
        const acceptedPassengers = ride.passengers.filter(p => p.status === 'ACCEPTED');
        await this.prisma.ridePassenger.deleteMany({ where: { rideId } });
        const deletedRide = await this.prisma.ride.delete({
            where: { id: rideId }
        });
        const driver = await this.prisma.user.findUnique({ where: { id: ride.driverId } });
        for (const p of acceptedPassengers) {
            await this.notificationsService.createNotification(p.passengerId, 'Chuyến đi bị huỷ ⚠️', `Tài xế ${driver?.name || 'Ai đó'} đã huỷ chuyến. Hãy tìm chuyến khác!`, 'RIDE_CANCELLED', '/rides');
        }
        return deletedRide;
    }
    async requestJoin(rideId, userId) {
        const ride = await this.prisma.ride.findUnique({
            where: { id: rideId },
            include: { driver: true }
        });
        if (!ride)
            throw new Error("Ride not found");
        if (ride.driverId === userId)
            throw new Error("Driver cannot join own ride");
        const existing = await this.prisma.ridePassenger.findUnique({
            where: { rideId_passengerId: { rideId, passengerId: userId } }
        });
        if (existing)
            throw new Error("Already requested");
        const passenger = await this.prisma.ridePassenger.create({
            data: { rideId, passengerId: userId, status: 'PENDING' }
        });
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        await this.notificationsService.createNotification(ride.driverId, 'Có người muốn ghép xe! 🚗', `${user?.name || 'Ai đó'} muốn ghép chuyến của bạn`, 'NEW_JOIN_REQUEST', `/rides/my`);
        return passenger;
    }
    async updatePassengerStatus(rideId, ridePassengerId, driverId, action) {
        const ride = await this.prisma.ride.findUnique({
            where: { id: rideId },
            include: { driver: true, passengers: { where: { status: 'ACCEPTED' } } }
        });
        if (!ride)
            throw new Error("Ride not found");
        if (ride.driverId !== driverId)
            throw new Error("Forbidden");
        const rp = await this.prisma.ridePassenger.findUnique({
            where: { id: ridePassengerId }
        });
        if (!rp)
            throw new Error("Request not found");
        if (rp.rideId !== rideId)
            throw new Error("Request not found");
        if (rp.status !== 'PENDING')
            throw new Error("Request already processed");
        if (action === 'ACCEPT') {
            const acceptedCount = ride.passengers.length;
            if (ride.seatsAvailable - acceptedCount <= 0) {
                throw new Error("No seats available");
            }
        }
        const newStatus = action === 'ACCEPT' ? 'ACCEPTED' : 'REJECTED';
        const updated = await this.prisma.ridePassenger.update({
            where: { id: ridePassengerId },
            data: { status: newStatus }
        });
        let conversationLink = '/messages';
        if (action === 'ACCEPT') {
            try {
                const conv = await this.messagesService.createConversation(driverId, rp.passengerId, rideId);
                if (conv && conv.id) {
                    conversationLink = `/messages/${conv.id}`;
                }
            }
            catch (err) {
                console.error('Failed to auto-create conversation', err);
            }
            await this.prisma.ride.update({
                where: { id: rideId },
                data: { seatsAvailable: { decrement: 1 } }
            });
        }
        const title = action === 'ACCEPT'
            ? 'Yêu cầu được chấp nhận! 🎉'
            : 'Yêu cầu bị từ chối';
        const message = action === 'ACCEPT'
            ? `Tài xế ${ride.driver.name} đã chấp nhận yêu cầu ghép xe của bạn`
            : `Tài xế ${ride.driver.name} đã từ chối yêu cầu ghép xe của bạn. Hãy thử chuyến khác!`;
        await this.notificationsService.createNotification(rp.passengerId, title, message, action === 'ACCEPT' ? 'RIDE_ACCEPTED' : 'RIDE_REJECTED', action === 'ACCEPT' ? conversationLink : `/rides`);
        return updated;
    }
    async cancelJoinRequest(rideId, userId) {
        const rp = await this.prisma.ridePassenger.findUnique({
            where: { rideId_passengerId: { rideId, passengerId: userId } },
            include: { ride: true }
        });
        if (!rp)
            throw new Error("Request not found");
        if (rp.status === 'REJECTED')
            throw new Error("Cannot cancel rejected request");
        await this.prisma.ridePassenger.delete({
            where: { rideId_passengerId: { rideId, passengerId: userId } }
        });
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        await this.notificationsService.createNotification(rp.ride.driverId, 'Hành khách huỷ ghép xe', `Hành khách ${user?.name || 'Ai đó'} đã huỷ yêu cầu đi chung chuyến ${rp.ride.pickupLocation} - ${rp.ride.destinationLocation}.`, 'SYSTEM', `/rides/${rideId}`);
        return { success: true };
    }
    async getMyRides(userId, role) {
        if (role === 'driver') {
            return this.prisma.ride.findMany({
                where: { driverId: userId },
                orderBy: { departureAt: 'desc' },
                include: {
                    passengers: {
                        include: { passenger: { select: { name: true, avatarUrl: true } } }
                    }
                }
            });
        }
        else {
            const participations = await this.prisma.ridePassenger.findMany({
                where: { passengerId: userId },
                include: {
                    ride: {
                        include: {
                            driver: { select: { name: true, avatarUrl: true } }
                        }
                    }
                },
                orderBy: { createdAt: 'desc' }
            });
            return participations.map(p => ({
                ...p.ride,
                myRequestStatus: p.status,
                requestCreatedAt: p.createdAt
            }));
        }
    }
};
exports.RidesService = RidesService;
exports.RidesService = RidesService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => messages_service_1.MessagesService))),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService,
        messages_service_1.MessagesService])
], RidesService);
//# sourceMappingURL=rides.service.js.map