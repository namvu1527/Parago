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
exports.AdminRidesController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("../admin.service");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
let AdminRidesController = class AdminRidesController {
    adminService;
    constructor(adminService) {
        this.adminService = adminService;
    }
    async getRides(page, limit, status) {
        return this.adminService.getRides(Number(page) || 1, Number(limit) || 10, status);
    }
    async cancelRide(id) {
        return this.adminService.cancelRide(id);
    }
};
exports.AdminRidesController = AdminRidesController;
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN', 'MODERATOR'),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AdminRidesController.prototype, "getRides", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN', 'MODERATOR'),
    (0, common_1.Patch)(':id/cancel'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminRidesController.prototype, "cancelRide", null);
exports.AdminRidesController = AdminRidesController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('admin/rides'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminRidesController);
//# sourceMappingURL=admin-rides.controller.js.map