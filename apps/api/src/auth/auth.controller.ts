import {
  Body,
  Controller,
  Post,
  Res,
} from '@nestjs/common';
import type { Request, Response } from 'express';

import {
  Req,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.register(dto);

    this.setRefreshCookie(response, result.refreshToken);

    return {
      accessToken: result.accessToken,
    };
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.login(dto);

    this.setRefreshCookie(response, result.refreshToken);

    return {
      accessToken: result.accessToken,
    };
  }

  private setRefreshCookie(
    response: Response,
    refreshToken: string,
  ) {
    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/api/auth',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

  @Post('refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies?.refresh_token;

    const result = await this.authService.refresh(refreshToken);

    this.setRefreshCookie(
      response,
      result.refreshToken,
    );

    return {
      accessToken: result.accessToken,
    };
  }
  
  @Post('logout')
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies?.refresh_token;

    await this.authService.logout(refreshToken);

    response.clearCookie('refresh_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/api/auth',
    });

    return {
      success: true,
    };
  }

  @Post('forgot-password')
async forgotPassword(
  @Body() dto: ForgotPasswordDto,
) {
  return this.authService.forgotPassword(
    dto.email,
  );
}

@Post('reset-password')
async resetPassword(
  @Body() dto: ResetPasswordDto,
) {
  return this.authService.resetPassword(
    dto.token,
    dto.password,
  );
}

@Post('verify-email')
async verifyEmail(
  @Body() dto: VerifyEmailDto,
) {
  return this.authService.verifyEmail(
    dto.token,
  );
}

}