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
exports.RidesController = void 0;
const common_1 = require("@nestjs/common");
const rides_service_1 = require("./rides.service");
const create_ride_dto_1 = require("./dto/create-ride.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let RidesController = class RidesController {
    ridesService;
    constructor(ridesService) {
        this.ridesService = ridesService;
    }
    async create(req, createRideDto) {
        return this.ridesService.createRide(req.user.id, createRideDto);
    }
    async findAll(query) {
        return this.ridesService.findAll(query);
    }
    async getMyRides(req, role) {
        return this.ridesService.getMyRides(req.user.id, role || 'driver');
    }
    async findOne(id) {
        const ride = await this.ridesService.findOne(id);
        if (!ride) {
            throw new common_1.NotFoundException('Ride not found');
        }
        return ride;
    }
    async cancel(id, req) {
        try {
            return await this.ridesService.cancelRide(id, req.user.id, req.user.systemRole);
        }
        catch (e) {
            if (e.message === 'Forbidden')
                throw new common_1.ForbiddenException('Bạn không có quyền huỷ chuyến đi này');
            if (e.message === 'Ride not found')
                throw new common_1.NotFoundException('Không tìm thấy chuyến đi');
            throw e;
        }
    }
    async remove(id, req) {
        try {
            return await this.ridesService.deleteRide(id, req.user.id, req.user.systemRole);
        }
        catch (e) {
            if (e.message === 'Forbidden')
                throw new common_1.ForbiddenException('Bạn không có quyền xoá chuyến đi này');
            if (e.message === 'Ride not found')
                throw new common_1.NotFoundException('Không tìm thấy chuyến đi');
            if (e.message === 'CONFLICT_ACCEPTED_PASSENGERS') {
                throw new common_1.ConflictException('Chuyến đi đã có hành khách, vui lòng dùng chức năng Huỷ chuyến thay vì xoá');
            }
            throw e;
        }
    }
    async requestJoin(id, req) {
        try {
            return await this.ridesService.requestJoin(id, req.user.id);
        }
        catch (e) {
            if (e.message === 'Already requested')
                throw new common_1.ConflictException('Bạn đã gửi yêu cầu rồi');
            if (e.message === 'Driver cannot join own ride')
                throw new common_1.ForbiddenException('Tài xế không thể ghép xe với chính mình');
            if (e.message === 'Ride not found')
                throw new common_1.NotFoundException('Không tìm thấy chuyến đi');
            throw e;
        }
    }
    async updatePassengerStatus(id, passengerId, action, req) {
        try {
            return await this.ridesService.updatePassengerStatus(id, passengerId, req.user.id, action);
        }
        catch (e) {
            if (e.message === 'Forbidden')
                throw new common_1.ForbiddenException('Bạn không phải là tài xế của chuyến đi này');
            if (e.message === 'Request not found')
                throw new common_1.NotFoundException('Không tìm thấy yêu cầu');
            if (e.message === 'Request already processed')
                throw new common_1.ConflictException('Yêu cầu này đã được xử lý');
            if (e.message === 'No seats available')
                throw new common_1.ConflictException('Đã hết ghế trống');
            if (e.message === 'Ride not found')
                throw new common_1.NotFoundException('Không tìm thấy chuyến đi');
            throw e;
        }
    }
    async cancelJoinRequest(id, req) {
        try {
            return await this.ridesService.cancelJoinRequest(id, req.user.id);
        }
        catch (e) {
            if (e.message === 'Request not found')
                throw new common_1.NotFoundException('Không tìm thấy yêu cầu ghép xe');
            if (e.message === 'Cannot cancel rejected request')
                throw new common_1.ConflictException('Không thể huỷ yêu cầu đã bị từ chối');
            throw e;
        }
    }
};
exports.RidesController = RidesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_ride_dto_1.CreateRideDto]),
    __metadata("design:returntype", Promise)
], RidesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RidesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('my'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], RidesController.prototype, "getMyRides", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RidesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/cancel'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RidesController.prototype, "cancel", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RidesController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/request-join'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RidesController.prototype, "requestJoin", null);
__decorate([
    (0, common_1.Patch)(':id/passengers/:passengerId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('passengerId')),
    __param(2, (0, common_1.Body)('action')),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], RidesController.prototype, "updatePassengerStatus", null);
__decorate([
    (0, common_1.Delete)(':id/request-join'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RidesController.prototype, "cancelJoinRequest", null);
exports.RidesController = RidesController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('rides'),
    __metadata("design:paramtypes", [rides_service_1.RidesService])
], RidesController);
//# sourceMappingURL=rides.controller.js.map