import { Injectable, NotFoundException, ForbiddenException, ConflictException, Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRideDto } from './dto/create-ride.dto';
import { Mode } from '@prisma/client';
import { NotificationsService } from '../notifications/notifications.service';
import { MessagesService } from '../messages/messages.service';

@Injectable()
export class RidesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationsService: NotificationsService,
    @Inject(forwardRef(() => MessagesService))
    private readonly messagesService: MessagesService
  ) {}

  async createRide(driverId: string, dto: CreateRideDto) {
    return this.prisma.ride.create({
      data: {
        driverId,
        pickupLocation: dto.pickupLocation,
        pickupLat: dto.pickupLat,
        pickupLng: dto.pickupLng,
        destinationLocation: dto.destinationLocation,
        destLat: dto.destLat,
        destLng: dto.destLng,
        distance: dto.distance,
        duration: dto.duration,
        departureAt: new Date(dto.departureAt),
        seatsAvailable: dto.seatsAvailable,
        price: dto.price,
        vehicleType: dto.vehicleType,
        vehicleName: dto.vehicleName,
        genderPreference: dto.genderPreference || "any",
        mode: dto.mode,
        status: 'PENDING',
        notes: dto.notes,
      },
    });
  }

  async findAll(query?: { mode?: string; status?: string; date?: string }) {
    const where: any = {};
    if (query?.mode) where.mode = query.mode;
    
    // TẠM THỜI BỎ FILTER status MẶC ĐỊNH LÀ PENDING ĐỂ SHOW HẾT 9 BẢN GHI NHƯ YÊU CẦU
    if (query?.status) where.status = query.status;

    if (query?.date) {
      // simple exact day matching if needed
      const startOfDay = new Date(query.date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(query.date);
      endOfDay.setHours(23, 59, 59, 999);
      where.departureAt = { gte: startOfDay, lte: endOfDay };
    }

    // TẠM THỜI BỎ FILTER departureAt > now() CHO GIAI ĐOẠN DEV/TEST
    // if (!query?.date) {
    //   where.departureAt = { gte: new Date() };
    // }

    console.log('[GET /rides] PRISMA WHERE CLAUSE:', JSON.stringify(where, null, 2));

    const rides = await this.prisma.ride.findMany({
      where,
      orderBy: { departureAt: 'asc' },
      include: {
        driver: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
            rating: true,
            verified: true,
            isPremium: true,
          }
        },
        passengers: {
          where: { status: 'ACCEPTED' },
          select: { id: true }
        }
      }
    });

    return rides.map(ride => {
      const acceptedCount = ride.passengers.length;
      return {
        ...ride,
        totalSeats: ride.seatsAvailable,
        seatsAvailable: Math.max(0, ride.seatsAvailable - acceptedCount),
      };
    });
  }

  async findOne(id: string) {
    const ride = await this.prisma.ride.findUnique({
      where: { id },
      include: {
        driver: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
            rating: true,
            verified: true,
            isPremium: true,
            university: true,
            faculty: true,
          }
        },
        passengers: {
          include: {
            passenger: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
                rating: true,
              }
            }
          }
        }
      }
    });

    if (!ride) return null;

    const acceptedCount = ride.passengers.filter(p => p.status === 'ACCEPTED').length;
    return {
      ...ride,
      totalSeats: ride.seatsAvailable,
      seatsAvailable: Math.max(0, ride.seatsAvailable - acceptedCount),
    };
  }

  async cancelRide(rideId: string, userId: string, systemRole: string) {
    const ride = await this.prisma.ride.findUnique({ where: { id: rideId } });
    if (!ride) throw new Error("Ride not found");
    if (ride.driverId !== userId && systemRole !== 'ADMIN') {
      throw new Error("Forbidden");
    }
    return this.prisma.ride.update({
      where: { id: rideId },
      data: { status: 'CANCELLED' }
    });
  }

  async completeRide(rideId: string, userId: string) {
    const ride = await this.prisma.ride.findUnique({ 
      where: { id: rideId },
      include: {
        passengers: { where: { status: 'ACCEPTED' } },
        driver: true,
      }
    });
    
    if (!ride) throw new Error("Ride not found");
    if (ride.driverId !== userId) {
      throw new Error("Forbidden");
    }
    if (ride.status !== 'PENDING') {
      throw new Error("Invalid status");
    }

    const txOps = [];

    // 1. Update ride status
    txOps.push(this.prisma.ride.update({
      where: { id: rideId },
      data: { status: 'COMPLETED' }
    }));

    // 2. Eco points calculation
    let driverPoints = ride.passengers.length * 5;
    if (ride.price === null || Number(ride.price) === 0 || ride.mode === 'COMMUNITY') {
      driverPoints += 5;
    }

    if (driverPoints > 0) {
      txOps.push(this.prisma.user.update({
        where: { id: ride.driverId },
        data: { ecoPoints: { increment: driverPoints } }
      }));
    }

    for (const p of ride.passengers) {
      txOps.push(this.prisma.user.update({
        where: { id: p.passengerId },
        data: { ecoPoints: { increment: 10 } }
      }));
    }

    const [updatedRide] = await this.prisma.$transaction(txOps);

    // Send notifications to all accepted passengers to review driver
    for (const p of ride.passengers) {
      await this.notificationsService.createNotification(
        p.passengerId,
        'Chuyến đi hoàn thành! 🌟',
        `Hãy đánh giá tài xế ${ride.driver.name}`,
        'RIDE_COMPLETED',
        `/rides/my`
      );
    }

    // Send notification to driver to review passengers
    if (ride.passengers.length > 0) {
      await this.notificationsService.createNotification(
        ride.driverId,
        'Chuyến đi hoàn thành! 🌟',
        'Đừng quên đánh giá các hành khách đi cùng',
        'RIDE_COMPLETED',
        `/rides/my`
      );
    }

    return updatedRide;
  }

  async deleteRide(rideId: string, userId: string, systemRole: string) {
    const ride = await this.prisma.ride.findUnique({ 
      where: { id: rideId },
      include: { passengers: true }
    });
    if (!ride) throw new Error("Ride not found");
    if (ride.driverId !== userId && systemRole !== 'ADMIN') {
      throw new Error("Forbidden");
    }
    
    // Check for ACCEPTED passengers if not ADMIN
    if (systemRole !== 'ADMIN') {
      const hasAccepted = ride.passengers.some(p => p.status === 'ACCEPTED');
      if (hasAccepted) {
        throw new Error("CONFLICT_ACCEPTED_PASSENGERS");
      }
    }

    // Get accepted passengers before deleting to notify them
    const acceptedPassengers = ride.passengers.filter(p => p.status === 'ACCEPTED');

    // Delete related passengers first (or cascade delete if configured)
    await this.prisma.ridePassenger.deleteMany({ where: { rideId } });

    // Then delete ride
    const deletedRide = await this.prisma.ride.delete({
      where: { id: rideId }
    });

    // Notify ALL accepted passengers about the cancellation
    const driver = await this.prisma.user.findUnique({ where: { id: ride.driverId } });
    for (const p of acceptedPassengers) {
      await this.notificationsService.createNotification(
        p.passengerId,
        'Chuyến đi bị huỷ ⚠️',
        `Tài xế ${driver?.name || 'Ai đó'} đã huỷ chuyến. Hãy tìm chuyến khác!`,
        'RIDE_CANCELLED',
        '/rides'
      );
    }

    return deletedRide;
  }

  async requestJoin(rideId: string, userId: string) {
    const ride = await this.prisma.ride.findUnique({
      where: { id: rideId },
      include: { driver: true }
    });
    if (!ride) throw new Error("Ride not found");
    if (ride.driverId === userId) throw new Error("Driver cannot join own ride");

    // Check if already requested
    const existing = await this.prisma.ridePassenger.findUnique({
      where: { rideId_passengerId: { rideId, passengerId: userId } }
    });
    if (existing) throw new Error("Already requested");

    const passenger = await this.prisma.ridePassenger.create({
      data: { rideId, passengerId: userId, status: 'PENDING' }
    });

    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    // Notify driver
    await this.notificationsService.createNotification(
      ride.driverId,
      'Có người muốn ghép xe! 🚗',
      `${user?.name || 'Ai đó'} muốn ghép chuyến của bạn`,
      'NEW_JOIN_REQUEST',
      `/rides/my`
    );

    return passenger;
  }

  async updatePassengerStatus(rideId: string, ridePassengerId: string, driverId: string, action: 'ACCEPT' | 'REJECT') {
    const ride = await this.prisma.ride.findUnique({
      where: { id: rideId },
      include: { driver: true, passengers: { where: { status: 'ACCEPTED' } } }
    });
    if (!ride) throw new Error("Ride not found");
    if (ride.driverId !== driverId) throw new Error("Forbidden");

    const rp = await this.prisma.ridePassenger.findUnique({
      where: { id: ridePassengerId }
    });
    if (!rp) throw new Error("Request not found");
    if (rp.rideId !== rideId) throw new Error("Request not found");
    if (rp.status !== 'PENDING') throw new Error("Request already processed");

    if (action === 'ACCEPT') {
      const acceptedCount = ride.passengers.length;
      if (ride.seatsAvailable - acceptedCount <= 0) {
        throw new Error("No seats available");
      }
    }

    const newStatus = action === 'ACCEPT' ? 'ACCEPTED' : 'REJECTED';
    
    const updated = await this.prisma.ridePassenger.update({
      where: { id: ridePassengerId },
      data: { status: newStatus }
    });

    let conversationLink = '/messages';
    if (action === 'ACCEPT') {
      // Create conversation
      try {
        const conv = await this.messagesService.createConversation(driverId, rp.passengerId, rideId);
        if (conv && conv.id) {
          conversationLink = `/messages/${conv.id}`;
        }
      } catch (err) {
        console.error('Failed to auto-create conversation', err);
      }
      
      // Giảm số ghế trống nếu đang tính toán động (tuỳ schema, hiện tại schema của em không có hàm giảm trực tiếp, nên ta có thể chỉ cần check lúc join)
      // Nếu có field seatsAvailable:
      // Removed decrement to keep seatsAvailable as totalSeats. Available seats is calculated dynamically.
    }

    // Notify passenger
    const title = action === 'ACCEPT' 
      ? 'Yêu cầu được chấp nhận! 🎉' 
      : 'Yêu cầu bị từ chối';
      
    const message = action === 'ACCEPT'
      ? `Tài xế ${ride.driver.name} đã chấp nhận yêu cầu ghép xe của bạn`
      : `Tài xế ${ride.driver.name} đã từ chối yêu cầu ghép xe của bạn. Hãy thử chuyến khác!`;
      
    await this.notificationsService.createNotification(
      rp.passengerId,
      title,
      message,
      action === 'ACCEPT' ? 'RIDE_ACCEPTED' : 'RIDE_REJECTED',
      action === 'ACCEPT' ? conversationLink : `/rides`
    );

    return updated;
  }

  async cancelJoinRequest(rideId: string, userId: string) {
    const rp = await this.prisma.ridePassenger.findUnique({
      where: { rideId_passengerId: { rideId, passengerId: userId } },
      include: { ride: true }
    });
    if (!rp) throw new Error("Request not found");
    if (rp.status === 'REJECTED') throw new Error("Cannot cancel rejected request");
    if (rp.status === 'ACCEPTED') throw new Error("Cannot cancel accepted request");

    // Delete the request
    await this.prisma.ridePassenger.delete({
      where: { rideId_passengerId: { rideId, passengerId: userId } }
    });

    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    // Notify driver if it was already accepted (or even pending)
    await this.notificationsService.createNotification(
      rp.ride.driverId,
      'Hành khách huỷ ghép xe',
      `Hành khách ${user?.name || 'Ai đó'} đã huỷ yêu cầu đi chung chuyến ${rp.ride.pickupLocation} - ${rp.ride.destinationLocation}.`,
      'SYSTEM',
      `/rides/${rideId}`
    );

    return { success: true };
  }

  async getMyRides(userId: string, role: string) {
    if (role === 'driver') {
      return this.prisma.ride.findMany({
        where: { driverId: userId },
        orderBy: { departureAt: 'desc' },
        include: {
          passengers: {
            include: { passenger: { select: { name: true, avatarUrl: true } } }
          },
          reviews: {
            where: { reviewerId: userId },
            select: { revieweeId: true }
          }
        }
      });
    } else {
      const participations = await this.prisma.ridePassenger.findMany({
        where: { passengerId: userId },
        include: {
          ride: {
            include: {
              driver: { select: { id: true, name: true, avatarUrl: true } },
              reviews: {
                where: { reviewerId: userId },
                select: { revieweeId: true }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      });
      // Flatten response
      return participations.map(p => ({
        ...p.ride,
        myRequestStatus: p.status,
        requestCreatedAt: p.createdAt
      }));
    }
  }

  async invitePreviousPassenger(rideId: string, driverId: string, passengerId: string) {
    const ride = await this.prisma.ride.findUnique({
      where: { id: rideId },
      include: { driver: true }
    });
    
    if (!ride) throw new Error("Ride not found");
    if (ride.driverId !== driverId) throw new Error("Forbidden");
    
    // Check if passenger is already in this ride
    const existing = await this.prisma.ridePassenger.findFirst({
      where: { rideId, passengerId }
    });
    
    if (existing) {
      throw new Error("Người này đã có trong danh sách yêu cầu / chuyến đi");
    }
    
    // Send RIDE_INVITE notification
    const time = new Date(ride.departureAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    await this.notificationsService.createNotification(
      passengerId,
      `Lời mời đi chung từ ${ride.driver.name}`,
      `Tài xế ${ride.driver.name} mời bạn tham gia chuyến đi ${ride.pickupLocation} → ${ride.destinationLocation} lúc ${time}`,
      'RIDE_INVITE',
      `/rides/${rideId}`
    );
    
    return { success: true };
  }

  async bulkCreateFromSchedules(userId: string, data: any) {
    const rides = [];
    for (const d of data.dates) {
      const departureTime = new Date(d);
      rides.push({
        driverId: userId,
        pickupLocation: data.pickupLocation,
        destinationLocation: data.destinationLocation,
        departureAt: departureTime,
        seatsAvailable: data.seats,
        price: data.price,
        mode: data.mode,
        vehicleType: 'MOTORBIKE'
      });
    }
    await this.prisma.ride.createMany({ data: rides });
    return { success: true, count: rides.length };
  }

  async getSuggestedRidesBySchedules(userId: string) {
    const schedules = await this.prisma.schedule.findMany({ where: { userId, isActive: true } });
    const now = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(now.getDate() + 7);
    const rides = await this.prisma.ride.findMany({
      where: { status: 'PENDING', departureAt: { gte: now, lte: nextWeek } },
      include: { driver: { select: { id: true, name: true, avatarUrl: true, rating: true, university: true } } }
    });
    const suggested = [];
    const dayMap = { MON: 1, TUE: 2, WED: 3, THU: 4, FRI: 5, SAT: 6, SUN: 0 };
    for (const r of rides) {
      if (r.driverId === userId) continue;
      const dTime = new Date(r.departureAt);
      const dDay = dTime.getDay();
      const dMins = dTime.getHours() * 60 + dTime.getMinutes();
      for (const s of schedules) {
        if (dayMap[s.dayOfWeek] === dDay) {
          const [h, m] = s.startTime.split(':').map(Number);
          const sMins = h * 60 + m;
          if (dMins >= sMins - 90 && dMins <= sMins - 10) {
            suggested.push(r);
            break;
          }
        }
      }
    }
    return suggested;
  }
}

