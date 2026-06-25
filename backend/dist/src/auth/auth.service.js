"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
let AuthService = class AuthService {
    usersService;
    jwtService;
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    validateEmailDomain(email) {
        const allowedDomains = (process.env.ALLOWED_EMAIL_DOMAINS || 'hust.edu.vn,vnu.edu.vn,neu.edu.vn,ftu.edu.vn,fpt.edu.vn,huce.edu.vn,hvnh.edu.vn,utc.edu.vn,tmu.edu.vn,tlu.edu.vn').split(',');
        const domain = email.split('@')[1];
        if (!allowedDomains.includes(domain)) {
            throw new common_1.BadRequestException('Email domain not allowed. Must be a supported university email.');
        }
    }
    async register(dto) {
        this.validateEmailDomain(dto.email);
        const existingUser = await this.usersService.findByEmail(dto.email);
        if (existingUser) {
            throw new common_1.BadRequestException('Email already in use');
        }
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(dto.password, salt);
        const user = await this.usersService.create({
            name: dto.name,
            email: dto.email,
            passwordHash,
            university: dto.university,
            faculty: dto.faculty,
        });
        console.log(`[Mock] Verification email sent to ${user.email}`);
        return { message: 'Registration successful. Please verify your email.' };
    }
    async login(dto) {
        const user = await this.usersService.findByEmail(dto.email);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return this.generateTokens(user.id, user.email);
    }
    async refresh(dto) {
        try {
            const decoded = this.jwtService.verify(dto.refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET || 'parago-super-secret-refresh-key',
            });
            const user = await this.usersService.findById(decoded.sub);
            if (!user || !user.refreshTokenHash) {
                throw new common_1.UnauthorizedException('Invalid refresh token');
            }
            const isMatch = await bcrypt.compare(dto.refreshToken, user.refreshTokenHash);
            if (!isMatch) {
                throw new common_1.UnauthorizedException('Invalid refresh token');
            }
            return this.generateTokens(user.id, user.email);
        }
        catch (e) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
    async logout(userId) {
        await this.usersService.update(userId, { refreshTokenHash: null });
        return { message: 'Logged out successfully' };
    }
    async generateTokens(userId, email) {
        const payload = { sub: userId, email };
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET || 'parago-super-secret-refresh-key',
            expiresIn: '7d',
        });
        const salt = await bcrypt.genSalt(10);
        const refreshTokenHash = await bcrypt.hash(refreshToken, salt);
        await this.usersService.update(userId, { refreshTokenHash });
        return {
            accessToken,
            refreshToken,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map