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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var TrackingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const ioredis_1 = __importDefault(require("ioredis"));
let TrackingService = TrackingService_1 = class TrackingService {
    prisma;
    logger = new common_1.Logger(TrackingService_1.name);
    redisClient;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async onModuleInit() {
        const redisUrl = process.env.REDIS_URL;
        if (!redisUrl) {
            throw new Error('REDIS_URL is not set in environment variables. Redis is strictly required for Live Tracking.');
        }
        this.redisClient = new ioredis_1.default(redisUrl, {
            maxRetriesPerRequest: 3,
            retryStrategy(times) {
                if (times > 3) {
                    return null;
                }
                return Math.min(times * 50, 2000);
            }
        });
        this.redisClient.on('error', (err) => {
            this.logger.error('CRITICAL: Redis connection error:', err);
        });
        this.redisClient.on('connect', () => {
            this.logger.log('Successfully connected to Redis for live tracking');
        });
    }
    onModuleDestroy() {
        if (this.redisClient) {
            this.redisClient.disconnect();
        }
    }
    async setLocation(userId, rideId, lat, lng) {
        if (!this.redisClient || this.redisClient.status !== 'ready') {
            this.logger.warn('Redis is not ready, location update dropped.');
            return;
        }
        const key = `tracking:ride:${rideId}:user:${userId}`;
        const payload = JSON.stringify({ userId, rideId, lat, lng, timestamp: Date.now() });
        await this.redisClient.setex(key, 30, payload);
    }
    async getRideLocations(rideId) {
        if (!this.redisClient || this.redisClient.status !== 'ready') {
            return [];
        }
        const keys = await this.redisClient.keys(`tracking:ride:${rideId}:user:*`);
        if (keys.length === 0)
            return [];
        const values = await this.redisClient.mget(keys);
        return values.filter(v => v).map(v => JSON.parse(v));
    }
    async triggerSOS(rideId, userId, lat, lng) {
        this.logger.warn(`SOS Triggered: Ride ${rideId}, User ${userId} at [${lat}, ${lng}]`);
        return this.prisma.sOSAlert.create({
            data: {
                rideId,
                triggeredByUserId: userId,
                lat,
                lng,
                status: 'ACTIVE',
            },
            include: {
                triggeredByUser: { select: { id: true, name: true, phone: true } },
                ride: { select: { vehicleName: true, pickupLocation: true, destinationLocation: true } }
            }
        });
    }
    async getActiveSOSAlerts() {
        return this.prisma.sOSAlert.findMany({
            where: { status: 'ACTIVE' },
            include: {
                triggeredByUser: { select: { id: true, name: true, phone: true } },
                ride: {
                    select: {
                        driver: { select: { id: true, name: true, phone: true } },
                        vehicleName: true,
                        vehicleType: true,
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
    }
};
exports.TrackingService = TrackingService;
exports.TrackingService = TrackingService = TrackingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TrackingService);
//# sourceMappingURL=tracking.service.js.map