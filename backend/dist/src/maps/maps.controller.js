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
exports.MapsController = exports.ReverseGeocodeDto = exports.GeocodeDto = exports.AutocompleteDto = exports.EstimateRouteDto = void 0;
const common_1 = require("@nestjs/common");
const maps_service_1 = require("./maps.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const throttler_1 = require("@nestjs/throttler");
const class_validator_1 = require("class-validator");
class EstimateRouteDto {
    originLat;
    originLng;
    destLat;
    destLng;
}
exports.EstimateRouteDto = EstimateRouteDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], EstimateRouteDto.prototype, "originLat", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], EstimateRouteDto.prototype, "originLng", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], EstimateRouteDto.prototype, "destLat", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], EstimateRouteDto.prototype, "destLng", void 0);
class AutocompleteDto {
    input;
    lat;
    lng;
}
exports.AutocompleteDto = AutocompleteDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AutocompleteDto.prototype, "input", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AutocompleteDto.prototype, "lat", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AutocompleteDto.prototype, "lng", void 0);
class GeocodeDto {
    placeId;
}
exports.GeocodeDto = GeocodeDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GeocodeDto.prototype, "placeId", void 0);
class ReverseGeocodeDto {
    lat;
    lng;
}
exports.ReverseGeocodeDto = ReverseGeocodeDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], ReverseGeocodeDto.prototype, "lat", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], ReverseGeocodeDto.prototype, "lng", void 0);
let MapsController = class MapsController {
    mapsService;
    constructor(mapsService) {
        this.mapsService = mapsService;
    }
    async estimateRoute(body) {
        return this.mapsService.estimateRoute(body.originLat, body.originLng, body.destLat, body.destLng);
    }
    async autocomplete(body) {
        return this.mapsService.autocomplete(body.input, body.lat, body.lng);
    }
    async geocode(body) {
        return this.mapsService.geocode(body.placeId);
    }
    async reverseGeocode(body) {
        return this.mapsService.reverseGeocode(body.lat, body.lng);
    }
};
exports.MapsController = MapsController;
__decorate([
    (0, throttler_1.Throttle)({ default: { limit: 10, ttl: 60000 } }),
    (0, common_1.Post)('estimate-route'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EstimateRouteDto]),
    __metadata("design:returntype", Promise)
], MapsController.prototype, "estimateRoute", null);
__decorate([
    (0, throttler_1.Throttle)({ default: { limit: 30, ttl: 60000 } }),
    (0, common_1.Post)('autocomplete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AutocompleteDto]),
    __metadata("design:returntype", Promise)
], MapsController.prototype, "autocomplete", null);
__decorate([
    (0, throttler_1.Throttle)({ default: { limit: 30, ttl: 60000 } }),
    (0, common_1.Post)('geocode'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GeocodeDto]),
    __metadata("design:returntype", Promise)
], MapsController.prototype, "geocode", null);
__decorate([
    (0, throttler_1.Throttle)({ default: { limit: 30, ttl: 60000 } }),
    (0, common_1.Post)('reverse-geocode'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ReverseGeocodeDto]),
    __metadata("design:returntype", Promise)
], MapsController.prototype, "reverseGeocode", null);
exports.MapsController = MapsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('maps'),
    __metadata("design:paramtypes", [maps_service_1.MapsService])
], MapsController);
//# sourceMappingURL=maps.controller.js.map