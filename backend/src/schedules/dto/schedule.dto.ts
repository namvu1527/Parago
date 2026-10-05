import { IsString, IsOptional, IsEnum, IsBoolean, Matches } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { DayOfWeek } from '@prisma/client';

export class CreateScheduleDto {
  @ApiProperty({ description: 'Tên môn học', required: false })
  @IsString()
  @IsOptional()
  subjectName?: string;

  @ApiProperty({ description: 'Phòng học', required: false })
  @IsString()
  @IsOptional()
  room?: string;

  @ApiProperty({ description: 'Toà nhà', required: false })
  @IsString()
  @IsOptional()
  building?: string;

  @ApiProperty({ enum: DayOfWeek, description: 'Thứ trong tuần' })
  @IsEnum(DayOfWeek)
  dayOfWeek: DayOfWeek;

  @ApiProperty({ description: 'Giờ bắt đầu, định dạng HH:mm', example: '07:30' })
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'startTime must be in HH:mm format' })
  startTime: string;

  @ApiProperty({ description: 'Giờ kết thúc, định dạng HH:mm', example: '09:30' })
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'endTime must be in HH:mm format' })
  endTime: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateScheduleDto extends PartialType(CreateScheduleDto) {}
