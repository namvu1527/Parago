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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AdminService = class AdminService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getUsers(page = 1, limit = 10, search) {
        const skip = (page - 1) * limit;
        const whereClause = {};
        if (search) {
            whereClause.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
            ];
        }
        const [users, total] = await Promise.all([
            this.prisma.user.findMany({
                where: whereClause,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true, name: true, email: true, university: true,
                    verified: true, systemRole: true, isBanned: true,
                    createdAt: true, avatarUrl: true,
                }
            }),
            this.prisma.user.count({ where: whereClause })
        ]);
        return { data: users, total, page, limit };
    }
    async verifyUser(id) {
        return this.prisma.user.update({
            where: { id },
            data: { verified: true },
            select: { id: true, name: true, verified: true }
        });
    }
    async banUser(id, reason) {
        return this.prisma.user.update({
            where: { id },
            data: { isBanned: true, banReason: reason },
            select: { id: true, name: true, isBanned: true, banReason: true }
        });
    }
    async unbanUser(id) {
        return this.prisma.user.update({
            where: { id },
            data: { isBanned: false, banReason: null },
            select: { id: true, name: true, isBanned: true }
        });
    }
    async changeUserRole(id, role) {
        return this.prisma.user.update({
            where: { id },
            data: { systemRole: role },
            select: { id: true, name: true, systemRole: true }
        });
    }
    async getRides(page = 1, limit = 10, status) {
        const skip = (page - 1) * limit;
        const whereClause = {};
        if (status) {
            whereClause.status = status;
        }
        const [rides, total] = await Promise.all([
            this.prisma.ride.findMany({
                where: whereClause,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: { driver: { select: { id: true, name: true, email: true } } }
            }),
            this.prisma.ride.count({ where: whereClause })
        ]);
        return { data: rides, total, page, limit };
    }
    async cancelRide(id) {
        return this.prisma.ride.update({
            where: { id },
            data: { status: 'CANCELLED' },
        });
    }
    async getActiveSOS() {
        return this.prisma.sOSAlert.findMany({
            where: { status: 'ACTIVE' },
            orderBy: { createdAt: 'desc' },
            include: {
                triggeredByUser: { select: { id: true, name: true, phone: true } },
                ride: { select: { pickupLocation: true, destinationLocation: true, driver: { select: { name: true, phone: true } } } }
            }
        });
    }
    async resolveSOS(id, status, adminId) {
        return this.prisma.sOSAlert.update({
            where: { id },
            data: {
                status,
                resolvedAt: new Date(),
                resolvedByAdminId: adminId
            }
        });
    }
    async getDashboardStats() {
        const [totalUsers, activeRides, newUsersToday] = await Promise.all([
            this.prisma.user.count(),
            this.prisma.ride.count({ where: { status: 'ACTIVE' } }),
            this.prisma.user.count({
                where: {
                    createdAt: {
                        gte: new Date(new Date().setHours(0, 0, 0, 0))
                    }
                }
            })
        ]);
        return {
            totalUsers,
            activeRides,
            newUsersToday,
            revenue: 37480000
        };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map