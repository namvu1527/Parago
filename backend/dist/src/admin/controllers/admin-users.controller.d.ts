import { AdminService } from '../admin.service';
import { SystemRole } from '@prisma/client';
export declare class AdminUsersController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getUsers(page: string, limit: string, search: string): Promise<{
        data: {
            id: string;
            name: string;
            email: string;
            university: string;
            avatarUrl: string | null;
            verified: boolean;
            systemRole: import(".prisma/client").$Enums.SystemRole | null;
            isBanned: boolean;
            createdAt: Date;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    verifyUser(id: string): Promise<{
        id: string;
        name: string;
        verified: boolean;
    }>;
    banUser(id: string, reason: string): Promise<{
        id: string;
        name: string;
        isBanned: boolean;
        banReason: string | null;
    }>;
    unbanUser(id: string): Promise<{
        id: string;
        name: string;
        isBanned: boolean;
    }>;
    changeRole(id: string, role: SystemRole | null): Promise<{
        id: string;
        name: string;
        systemRole: import(".prisma/client").$Enums.SystemRole | null;
    }>;
}
