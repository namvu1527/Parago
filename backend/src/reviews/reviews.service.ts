import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/review.dto';
import { RideStatus } from '@prisma/client';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async createReview(reviewerId: string, dto: CreateReviewDto) {
    if (reviewerId === dto.revieweeId) {
      throw new BadRequestException('Không thể tự đánh giá bản thân');
    }

    const ride = await this.prisma.ride.findUnique({
      where: { id: dto.rideId },
      include: {
        passengers: true,
      },
    });

    if (!ride) {
      throw new BadRequestException('Không tìm thấy chuyến đi');
    }

    if (ride.status !== RideStatus.COMPLETED) {
      throw new BadRequestException('Chỉ có thể đánh giá khi chuyến đi đã hoàn thành');
    }

    // Check if both users are in the ride
    const isReviewerDriver = ride.driverId === reviewerId;
    const isRevieweeDriver = ride.driverId === dto.revieweeId;
    
    const isReviewerPassenger = ride.passengers.some(p => p.passengerId === reviewerId && p.status === 'ACCEPTED');
    const isRevieweePassenger = ride.passengers.some(p => p.passengerId === dto.revieweeId && p.status === 'ACCEPTED');

    if (!isReviewerDriver && !isReviewerPassenger) {
      throw new BadRequestException('Bạn không tham gia chuyến đi này');
    }

    if (!isRevieweeDriver && !isRevieweePassenger) {
      throw new BadRequestException('Người được đánh giá không tham gia chuyến đi này');
    }

    // Constraints check
    if (isReviewerPassenger && !isRevieweeDriver) {
      throw new BadRequestException('Hành khách chỉ được đánh giá tài xế của chuyến đi');
    }
    
    if (isReviewerDriver && !isRevieweePassenger) {
      throw new BadRequestException('Tài xế chỉ được đánh giá hành khách của chuyến đi');
    }

    // Check if already reviewed
    const existingReview = await this.prisma.review.findUnique({
      where: {
        rideId_reviewerId_revieweeId: {
          rideId: dto.rideId,
          reviewerId,
          revieweeId: dto.revieweeId,
        },
      },
    });

    if (existingReview) {
      throw new BadRequestException('Bạn đã đánh giá người này trong chuyến đi này rồi');
    }

    // Create review
    const review = await this.prisma.review.create({
      data: {
        rideId: dto.rideId,
        reviewerId,
        revieweeId: dto.revieweeId,
        rating: dto.rating,
        comment: dto.comment,
      },
    });

    // Calculate new average rating for reviewee
    const allReviews = await this.prisma.review.findMany({
      where: { revieweeId: dto.revieweeId },
      select: { rating: true },
    });

    const avgRating = allReviews.length > 0 
      ? allReviews.reduce((acc, curr) => acc + curr.rating, 0) / allReviews.length 
      : 5.0;

    await this.prisma.user.update({
      where: { id: dto.revieweeId },
      data: { rating: Number(avgRating.toFixed(1)) },
    });

    return review;
  }

  async getReviewsByUser(userId: string) {
    return this.prisma.review.findMany({
      where: { revieweeId: userId },
      include: {
        reviewer: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          }
        },
        ride: {
          select: {
            pickupLocation: true,
            destinationLocation: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });
  }
}
