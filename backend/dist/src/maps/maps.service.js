"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var MapsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapsService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
let MapsService = MapsService_1 = class MapsService {
    logger = new common_1.Logger(MapsService_1.name);
    headers = {
        'User-Agent': 'Parago-App/1.0 (dev)',
        'Accept-Language': 'vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7',
    };
    nominatimQueue = Promise.resolve();
    async enforceNominatimRateLimit() {
        const currentQueue = this.nominatimQueue;
        this.nominatimQueue = currentQueue.then(() => new Promise(resolve => setTimeout(resolve, 1000)));
        await currentQueue;
    }
    async estimateRoute(originLat, originLng, destLat, destLng) {
        try {
            const url = `http://router.project-osrm.org/route/v1/driving/${originLng},${originLat};${destLng},${destLat}`;
            const response = await axios_1.default.get(url, {
                params: { overview: 'full', geometries: 'polyline' },
                headers: this.headers,
            });
            const data = response.data;
            if (!data.routes || data.routes.length === 0) {
                throw new common_1.BadRequestException('Cannot find a route between these two locations.');
            }
            const route = data.routes[0];
            const distance = route.distance;
            const duration = route.duration;
            return {
                distance,
                distanceText: distance >= 1000 ? `${(distance / 1000).toFixed(1)} km` : `${Math.round(distance)} m`,
                duration,
                durationText: duration >= 3600
                    ? `${Math.floor(duration / 3600)} giờ ${Math.round((duration % 3600) / 60)} phút`
                    : `${Math.round(duration / 60)} phút`,
                polyline: route.geometry,
            };
        }
        catch (error) {
            this.logger.error('OSRM API Error:', error.response?.data || error.message);
            throw new common_1.BadRequestException('Failed to estimate route from OSRM API.');
        }
    }
    async autocomplete(input, lat, lng) {
        try {
            let normalizedInput = input
                .replace(/\bktx\b/gi, 'ký túc xá')
                .replace(/\bđh\b/gi, 'đại học')
                .replace(/\b(cd|cđ)\b/gi, 'cao đẳng')
                .replace(/\bpt\b/gi, 'phổ thông')
                .replace(/\bthpt\b/gi, 'trung học phổ thông')
                .replace(/\b(gv|giảng viên)\b/gi, 'giảng viên')
                .replace(/\b(sv|sinh viên)\b/gi, 'sinh viên')
                .replace(/\b(bv|bệnh viện)\b/gi, 'bệnh viện');
            if (!normalizedInput.toLowerCase().includes('hà nội')) {
                normalizedInput += ' Hà Nội';
            }
            const mappings = [
                { regex: /ktx bách khoa/i, replace: 'Ký túc xá Đại học Bách khoa Hà Nội' },
                { regex: /bách khoa/i, replace: 'Đại học Bách khoa Hà Nội' },
                { regex: /m[ỹĩ] đình/i, replace: 'Sân vận động Mỹ Đình Hà Nội' },
                { regex: /nội bài/i, replace: 'Sân bay Nội Bài Hà Nội' },
                { regex: /hồ gươm/i, replace: 'Hồ Hoàn Kiếm Hà Nội' },
                { regex: /văn miếu/i, replace: 'Văn Miếu Quốc Tử Giám Hà Nội' },
            ];
            for (const mapping of mappings) {
                if (mapping.regex.test(normalizedInput)) {
                    normalizedInput = mapping.replace;
                    break;
                }
            }
            await this.enforceNominatimRateLimit();
            const response = await axios_1.default.get(`https://nominatim.openstreetmap.org/search`, {
                params: {
                    q: normalizedInput,
                    format: 'jsonv2',
                    addressdetails: 1,
                    countrycodes: 'vn',
                    viewbox: '105.7,20.9,106.0,21.1',
                    bounded: 1,
                    limit: 5,
                },
                headers: {
                    ...this.headers,
                    'Accept-Language': 'vi',
                },
            });
            const predictions = response.data.map((item) => {
                const address = item.address || {};
                const mainText = address.road || address.pedestrian || item.name || item.display_name.split(',')[0];
                const parsedLat = parseFloat(item.lat);
                const parsedLng = parseFloat(item.lon);
                const fakePlaceId = Buffer.from(JSON.stringify({
                    lat: parsedLat,
                    lng: parsedLng,
                    address: item.display_name
                })).toString('base64');
                return {
                    place_id: fakePlaceId,
                    lat: parsedLat,
                    lng: parsedLng,
                    description: item.display_name,
                    structured_formatting: {
                        main_text: mainText,
                        secondary_text: item.display_name,
                    }
                };
            });
            return { predictions };
        }
        catch (error) {
            this.logger.error('Nominatim Autocomplete Error:', error.message);
            throw new common_1.BadRequestException('Failed to fetch autocomplete suggestions');
        }
    }
    async geocode(placeId) {
        try {
            const decoded = JSON.parse(Buffer.from(placeId, 'base64').toString('utf-8'));
            return {
                result: {
                    geometry: {
                        location: {
                            lat: decoded.lat,
                            lng: decoded.lng,
                        }
                    },
                    formatted_address: decoded.address,
                    name: decoded.address,
                }
            };
        }
        catch (error) {
            this.logger.error('Geocode Error:', error.message);
            throw new common_1.BadRequestException('Failed to parse place_id details');
        }
    }
    async reverseGeocode(lat, lng) {
        try {
            await this.enforceNominatimRateLimit();
            const response = await axios_1.default.get(`https://nominatim.openstreetmap.org/reverse`, {
                params: {
                    lat,
                    lon: lng,
                    format: 'jsonv2',
                },
                headers: this.headers,
            });
            return {
                results: [
                    {
                        formatted_address: response.data.display_name,
                    }
                ]
            };
        }
        catch (error) {
            this.logger.error('Nominatim Reverse Geocode Error:', error.message);
            throw new common_1.BadRequestException('Failed to reverse geocode');
        }
    }
};
exports.MapsService = MapsService;
exports.MapsService = MapsService = MapsService_1 = __decorate([
    (0, common_1.Injectable)()
], MapsService);
//# sourceMappingURL=maps.service.js.map