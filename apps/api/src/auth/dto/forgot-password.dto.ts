import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({ example: 'alex@taskflow.app', format: 'email' })
  @IsEmail()
  email!: string;
}
