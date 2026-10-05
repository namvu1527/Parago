import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async getPreviousPassengers(driverId: string) {
    // Find unique passengers who were ACCEPTED in rides where driver is driverId
    const rides = await this.prisma.ride.findMany({
      where: { driverId },
      include: {
        passengers: {
          where: { status: 'ACCEPTED' },
          include: { passenger: { select: { id: true, name: true, avatarUrl: true, rating: true, university: true } } }
        }
      }
    });

    const passengersMap = new Map<string, any>();
    rides.forEach(ride => {
      ride.passengers.forEach(p => {
        if (!passengersMap.has(p.passengerId)) {
          passengersMap.set(p.passengerId, p.passenger);
        }
      });
    });

    return Array.from(passengersMap.values());
  }
}
