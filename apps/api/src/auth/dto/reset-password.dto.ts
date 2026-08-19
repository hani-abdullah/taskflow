import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({ example: '0f7d2c7a6b6a4fbdb66e8c743b949eef', minLength: 32 })
  @IsString()
  @MinLength(32)
  token!: string;

  @ApiProperty({ example: 'NewStrongPass123!', minLength: 8, maxLength: 100, format: 'password' })
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  password!: string;
}
