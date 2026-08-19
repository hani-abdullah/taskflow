import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { TaskPriority, TaskStatus } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Review homepage copy', maxLength: 200 })
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  title!: string;

  @ApiPropertyOptional({ example: 'Review hero and pricing copy before launch.', maxLength: 2000 })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  @ApiPropertyOptional({ enum: TaskStatus, example: 'TODO' })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiPropertyOptional({ enum: TaskPriority, example: 'HIGH' })
  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @ApiPropertyOptional({ example: '2026-09-01T12:00:00.000Z', format: 'date-time' })
  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @ApiProperty({ example: 'cm123project' })
  @IsString()
  projectId!: string;

  @ApiPropertyOptional({ example: 'cm123user' })
  @IsOptional()
  @IsString()
  assigneeId?: string;
}
