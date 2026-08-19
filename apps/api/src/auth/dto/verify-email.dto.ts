import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyEmailDto {
  @ApiProperty({ example: '0f7d2c7a6b6a4fbdb66e8c743b949eef', minLength: 32 })
  @IsString()
  @MinLength(32)
  token!: string;
}
