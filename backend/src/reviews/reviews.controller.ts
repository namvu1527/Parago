import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/review.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import type { User } from '@prisma/client';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Leave a review for a ride participant' })
  createReview(@CurrentUser() user: User, @Body() dto: CreateReviewDto) {
    return this.reviewsService.createReview(user.id, dto);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get recent reviews for a user' })
  getReviewsByUser(@Param('userId') userId: string) {
    return this.reviewsService.getReviewsByUser(userId);
  }
}
