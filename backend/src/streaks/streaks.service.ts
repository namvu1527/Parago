import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { DayOfWeek } from '@prisma/client';

@Injectable()
export class StreaksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsService: NotificationsService,
  ) {}

  async evaluateStreak(userId: string) {
    let streak = await this.prisma.studyStreak.findUnique({ where: { userId } });
    if (!streak) {
      streak = await this.prisma.studyStreak.create({ data: { userId } });
      return streak;
    }

    const latestLog = await this.prisma.streakLog.findFirst({
      where: { userId },
      orderBy: { date: 'desc' }
    });

    if (!latestLog) return streak;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startDate = new Date(latestLog.date);
    startDate.setHours(0, 0, 0, 0);
    startDate.setDate(startDate.getDate() + 1);

    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() - 1);

    if (startDate.getTime() > endDate.getTime()) return streak;

    const schedules = await this.prisma.schedule.findMany({ where: { userId, isActive: true } });
    const scheduledDays = new Set(schedules.map(s => s.dayOfWeek));
    const dayMap: DayOfWeek[] = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const recentLogs = await this.prisma.streakLog.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
      take: 3
    });

    let consecutiveMisses = 0;
    for (const log of recentLogs) {
      if (log.status !== 'ATTENDED') consecutiveMisses++;
      else break;
    }

    let currentStreak = streak.currentStreak;
    let isFrozen = streak.isFrozen;
    const newLogs = [];

    const d = new Date(startDate);
    while (d.getTime() <= endDate.getTime()) {
      const dayName = dayMap[d.getDay()];
      if (scheduledDays.has(dayName)) {
        consecutiveMisses++;
        if (consecutiveMisses < 3) {
          isFrozen = true;
          newLogs.push({ userId, date: new Date(d), status: 'FROZEN' });
        } else {
          isFrozen = false;
          currentStreak = 0;
          newLogs.push({ userId, date: new Date(d), status: 'MISSED' });
        }
      }
      d.setDate(d.getDate() + 1);
    }

    if (newLogs.length > 0) {
      await this.prisma.streakLog.createMany({ data: newLogs as any });
      streak = await this.prisma.studyStreak.update({
        where: { userId },
        data: { currentStreak, isFrozen }
      });
    }

    return streak;
  }

  async incrementStreak(userId: string, rideDate: Date) {
    let streak = await this.evaluateStreak(userId);

    const startOfDay = new Date(rideDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(rideDate);
    endOfDay.setHours(23, 59, 59, 999);

    const existingLog = await this.prisma.streakLog.findFirst({
      where: { userId, date: { gte: startOfDay, lte: endOfDay } }
    });

    if (existingLog && existingLog.status === 'ATTENDED') {
      return { streakIncreased: false, streak };
    }

    let currentStreak = streak.currentStreak + 1;
    let longestStreak = Math.max(streak.longestStreak, currentStreak);
    let isFrozen = false;
    let milestonesReached = streak.milestonesReached;
    let pointsAwarded = 0;
    
    // Check milestones
    if (currentStreak === 7 && !milestonesReached.includes('7')) {
      pointsAwarded = 20;
      milestonesReached.push('7');
    } else if (currentStreak === 30 && !milestonesReached.includes('30')) {
      pointsAwarded = 50;
      milestonesReached.push('30');
    } else if (currentStreak === 100 && !milestonesReached.includes('100')) {
      pointsAwarded = 100;
      milestonesReached.push('100');
    }

    await this.prisma.$transaction(async (prisma) => {
      await prisma.streakLog.create({
        data: { userId, date: startOfDay, status: 'ATTENDED' }
      });

      streak = await prisma.studyStreak.update({
        where: { userId },
        data: {
          currentStreak,
          longestStreak,
          isFrozen,
          lastStudyDate: startOfDay,
          milestonesReached
        }
      });

      if (pointsAwarded > 0) {
        await prisma.user.update({
          where: { id: userId },
          data: { ecoPoints: { increment: pointsAwarded } }
        });
      }
    });

    if (pointsAwarded > 0) {
      await this.notificationsService.createNotification(
        userId,
        'Thưởng chuỗi đi học! 🔥',
        `🔥 Chuỗi ${currentStreak} ngày liên tiếp! Bạn được thưởng +${pointsAwarded} Eco Points.`,
        'SYSTEM'
      );
    }

    return { streakIncreased: true, streak, pointsAwarded };
  }

  async getMyStreak(userId: string) {
    return this.evaluateStreak(userId);
  }
}
