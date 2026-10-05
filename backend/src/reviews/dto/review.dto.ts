import { IsString, IsInt, Min, Max, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({ example: 'uuid', description: 'ID of the ride' })
  @IsUUID()
  rideId: string;

  @ApiProperty({ example: 'uuid', description: 'ID of the user being reviewed' })
  @IsUUID()
  revieweeId: string;

  @ApiProperty({ example: 5, description: 'Rating from 1 to 5' })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiPropertyOptional({ example: 'Chuyến đi tuyệt vời', description: 'Comment about the ride' })
  @IsString()
  @IsOptional()
  comment?: string;
}
