import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { StreaksService } from './streaks.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('streaks')
@UseGuards(JwtAuthGuard)
export class StreaksController {
  constructor(private readonly streaksService: StreaksService) {}

  @Get('me')
  getMyStreak(@Request() req: any) {
    return this.streaksService.getMyStreak(req.user.id);
  }
}
