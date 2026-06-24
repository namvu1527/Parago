import { Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private usersService;
    constructor(usersService: UsersService);
    validate(payload: any): Promise<{
        name: string;
        id: string;
        email: string;
        phone: string | null;
        passwordHash: string;
        university: string;
        faculty: string;
        avatarUrl: string | null;
        isDriver: boolean;
        isPremium: boolean;
        ecoPoints: number;
        rating: number;
        totalRides: number;
        trustScore: number;
        verified: boolean;
        refreshTokenHash: string | null;
        systemRole: import(".prisma/client").$Enums.SystemRole | null;
        isBanned: boolean;
        banReason: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};
