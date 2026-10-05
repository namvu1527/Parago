import { Injectable, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateScheduleDto, UpdateScheduleDto } from './dto/schedule.dto';

@Injectable()
export class SchedulesService {
  constructor(private prisma: PrismaService) {}

  private validateTime(startTime: string, endTime: string) {
    if (!startTime || !endTime) return;
    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);
    
    const startMins = startH * 60 + startM;
    const endMins = endH * 60 + endM;
    
    if (endMins <= startMins) {
      throw new BadRequestException('endTime phải sau startTime');
    }
  }

  async getMySchedules(userId: string) {
    return this.prisma.schedule.findMany({
      where: { userId },
      orderBy: [
        { dayOfWeek: 'asc' },
        { startTime: 'asc' }
      ]
    });
  }

  async createSchedule(userId: string, dto: CreateScheduleDto) {
    this.validateTime(dto.startTime, dto.endTime);
    
    return this.prisma.schedule.create({
      data: {
        ...dto,
        userId
      }
    });
  }

  async updateSchedule(userId: string, scheduleId: string, dto: UpdateScheduleDto) {
    const schedule = await this.prisma.schedule.findUnique({ where: { id: scheduleId } });
    if (!schedule) throw new NotFoundException('Schedule not found');
    if (schedule.userId !== userId) throw new ForbiddenException('You do not have permission to modify this schedule');

    // If updating either startTime or endTime, validate the new combination
    const newStartTime = dto.startTime ?? schedule.startTime;
    const newEndTime = dto.endTime ?? schedule.endTime;
    this.validateTime(newStartTime, newEndTime);

    return this.prisma.schedule.update({
      where: { id: scheduleId },
      data: dto
    });
  }

  async deleteSchedule(userId: string, scheduleId: string) {
    const schedule = await this.prisma.schedule.findUnique({ where: { id: scheduleId } });
    if (!schedule) throw new NotFoundException('Schedule not found');
    if (schedule.userId !== userId) throw new ForbiddenException('You do not have permission to delete this schedule');

    return this.prisma.schedule.delete({
      where: { id: scheduleId }
    });
  }
}
