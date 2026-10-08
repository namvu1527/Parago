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
const streaks_service_1 = require("../streaks/streaks.service");
let RidesService = class RidesService {
    prisma;
    notificationsService;
    messagesService;
    streaksService;
    constructor(prisma, notificationsService, messagesService, streaksService) {
        this.prisma = prisma;
        this.notificationsService = notificationsService;
        this.messagesService = messagesService;
        this.streaksService = streaksService;
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
    async completeRide(rideId, userId) {
        const ride = await this.prisma.ride.findUnique({
            where: { id: rideId },
            include: {
                passengers: { where: { status: 'ACCEPTED' } },
                driver: true,
            }
        });
        if (!ride)
            throw new Error("Ride not found");
        if (ride.driverId !== userId) {
            throw new Error("Forbidden");
        }
        if (ride.status !== 'PENDING') {
            throw new Error("Invalid status");
        }
        const txOps = [];
        txOps.push(this.prisma.ride.update({
            where: { id: rideId },
            data: { status: 'COMPLETED' }
        }));
        let driverPoints = ride.passengers.length * 5;
        if (ride.price === null || Number(ride.price) === 0 || ride.mode === 'COMMUNITY') {
            driverPoints += 5;
        }
        if (driverPoints > 0) {
            txOps.push(this.prisma.user.update({
                where: { id: ride.driverId },
                data: { ecoPoints: { increment: driverPoints } }
            }));
        }
        for (const p of ride.passengers) {
            txOps.push(this.prisma.user.update({
                where: { id: p.passengerId },
                data: { ecoPoints: { increment: 10 } }
            }));
        }
        const [updatedRide] = await this.prisma.$transaction(txOps);
        let driverStreakResult = null;
        try {
            driverStreakResult = await this.streaksService.incrementStreak(ride.driverId, ride.departureAt);
            for (const p of ride.passengers) {
                await this.streaksService.incrementStreak(p.passengerId, ride.departureAt);
            }
        }
        catch (err) {
            console.error('Streak update failed:', err);
        }
        for (const p of ride.passengers) {
            await this.notificationsService.createNotification(p.passengerId, 'Chuyến đi hoàn thành! 🌟', `Hãy đánh giá tài xế ${ride.driver.name}`, 'RIDE_COMPLETED', `/rides/my`);
        }
        if (ride.passengers.length > 0) {
            await this.notificationsService.createNotification(ride.driverId, 'Chuyến đi hoàn thành! 🌟', 'Đừng quên đánh giá các hành khách đi cùng', 'RIDE_COMPLETED', `/rides/my`);
        }
        return { ...updatedRide, streakIncreased: driverStreakResult?.streakIncreased, newStreak: driverStreakResult?.streak?.currentStreak };
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
        if (rp.status === 'ACCEPTED')
            throw new Error("Cannot cancel accepted request");
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
                    },
                    reviews: {
                        where: { reviewerId: userId },
                        select: { revieweeId: true }
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
                            driver: { select: { id: true, name: true, avatarUrl: true } },
                            reviews: {
                                where: { reviewerId: userId },
                                select: { revieweeId: true }
                            }
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
    async invitePreviousPassenger(rideId, driverId, passengerId) {
        const ride = await this.prisma.ride.findUnique({
            where: { id: rideId },
            include: { driver: true }
        });
        if (!ride)
            throw new Error("Ride not found");
        if (ride.driverId !== driverId)
            throw new Error("Forbidden");
        const existing = await this.prisma.ridePassenger.findFirst({
            where: { rideId, passengerId }
        });
        if (existing) {
            throw new Error("Người này đã có trong danh sách yêu cầu / chuyến đi");
        }
        const time = new Date(ride.departureAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
        await this.notificationsService.createNotification(passengerId, `Lời mời đi chung từ ${ride.driver.name}`, `Tài xế ${ride.driver.name} mời bạn tham gia chuyến đi ${ride.pickupLocation} → ${ride.destinationLocation} lúc ${time}`, 'RIDE_INVITE', `/rides/${rideId}`);
        return { success: true };
    }
    async bulkCreateFromSchedules(userId, data) {
        const rides = [];
        for (const d of data.dates) {
            const departureTime = new Date(d);
            rides.push({
                driverId: userId,
                pickupLocation: data.pickupLocation,
                destinationLocation: data.destinationLocation,
                departureAt: departureTime,
                seatsAvailable: data.seats,
                price: data.price,
                mode: data.mode,
                vehicleType: 'MOTORBIKE'
            });
        }
        await this.prisma.ride.createMany({ data: rides });
        return { success: true, count: rides.length };
    }
    async getSuggestedRidesBySchedules(userId) {
        const schedules = await this.prisma.schedule.findMany({ where: { userId, isActive: true } });
        const now = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(now.getDate() + 7);
        const rides = await this.prisma.ride.findMany({
            where: { status: 'PENDING', departureAt: { gte: now, lte: nextWeek } },
            include: { driver: { select: { id: true, name: true, avatarUrl: true, rating: true, university: true } } }
        });
        const suggested = [];
        const dayMap = { MON: 1, TUE: 2, WED: 3, THU: 4, FRI: 5, SAT: 6, SUN: 0 };
        for (const r of rides) {
            if (r.driverId === userId)
                continue;
            const dTime = new Date(r.departureAt);
            const dDay = dTime.getDay();
            const dMins = dTime.getHours() * 60 + dTime.getMinutes();
            for (const s of schedules) {
                if (dayMap[s.dayOfWeek] === dDay) {
                    const [h, m] = s.startTime.split(':').map(Number);
                    const sMins = h * 60 + m;
                    if (dMins >= sMins - 90 && dMins <= sMins - 10) {
                        suggested.push(r);
                        break;
                    }
                }
            }
        }
        return suggested;
    }
};
exports.RidesService = RidesService;
exports.RidesService = RidesService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => messages_service_1.MessagesService))),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService,
        messages_service_1.MessagesService,
        streaks_service_1.StreaksService])
], RidesService);
//# sourceMappingURL=rides.service.js.map