import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'alex@taskflow.app', format: 'email' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'StrongPass123!', minLength: 8, maxLength: 100, format: 'password' })
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  password!: string;

  @ApiProperty({ example: 'Alex', minLength: 1, maxLength: 50 })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  firstName!: string;

  @ApiProperty({ example: 'Morgan', minLength: 1, maxLength: 50 })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  lastName!: string;
}
