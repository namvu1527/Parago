import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto, UpdateScheduleDto } from './dto/schedule.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import type { User } from '@prisma/client';

@ApiTags('Schedules')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user schedules' })
  getMySchedules(@CurrentUser() user: User) {
    return this.schedulesService.getMySchedules(user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new schedule' })
  createSchedule(@CurrentUser() user: User, @Body() dto: CreateScheduleDto) {
    return this.schedulesService.createSchedule(user.id, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a schedule' })
  updateSchedule(
    @CurrentUser() user: User, 
    @Param('id') id: string, 
    @Body() dto: UpdateScheduleDto
  ) {
    return this.schedulesService.updateSchedule(user.id, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a schedule' })
  deleteSchedule(@CurrentUser() user: User, @Param('id') id: string) {
    return this.schedulesService.deleteSchedule(user.id, id);
  }
}
