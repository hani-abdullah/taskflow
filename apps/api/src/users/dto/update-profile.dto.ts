import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'Alex', maxLength: 50 })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  firstName?: string;

  @ApiPropertyOptional({ example: 'Morgan', maxLength: 50 })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  lastName?: string;
}
