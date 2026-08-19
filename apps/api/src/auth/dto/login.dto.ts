import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'alex@taskflow.app', format: 'email' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'StrongPass123!', minLength: 8, maxLength: 100, format: 'password' })
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  password!: string;
}
