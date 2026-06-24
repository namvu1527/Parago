import { AdminService } from '../admin.service';
export declare class AdminStatsController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getDashboardStats(): Promise<{
        totalUsers: number;
        activeRides: number;
        newUsersToday: number;
        revenue: number;
    }>;
}
