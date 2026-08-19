import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import type { Request, Response } from 'express';

import { Req } from '@nestjs/common';

import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { Throttle } from '@nestjs/throttler';
import { ApiBearerAuth, ApiConflictResponse, ApiCookieAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags, ApiTooManyRequestsResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

interface RequestWithRefreshCookie extends Request {
  cookies: { refresh_token?: unknown };
}

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Create an account', description: 'Creates a user, sends a verification email, sets the refresh-token cookie, and returns a JWT access token.' })
  @ApiCreatedResponse({ description: 'Account created.', schema: { example: { accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' } } })
  @ApiConflictResponse({ description: 'An account already exists for this email.' })
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
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @ApiOperation({ summary: 'Sign in' })
  @ApiOkResponse({ description: 'Credentials accepted; refresh cookie set.', schema: { example: { accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' } } })
  @ApiUnauthorizedResponse({ description: 'Email or password is incorrect.' })
  @ApiTooManyRequestsResponse({ description: 'Too many login attempts.' })
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

  private setRefreshCookie(response: Response, refreshToken: string) {
    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/api/auth',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get the current user' })
  @ApiOkResponse({ schema: { example: { id: 'cm123user', email: 'alex@taskflow.app', firstName: 'Alex', lastName: 'Morgan', role: 'USER', emailVerified: true } } })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid access token.' })
  async me(@CurrentUser() user: { id: string }) {
    return this.authService.getCurrentUser(user.id);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiCookieAuth('refresh_token')
  @ApiOperation({ summary: 'Refresh the access token' })
  @ApiOkResponse({ schema: { example: { accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' } } })
  @ApiUnauthorizedResponse({ description: 'Refresh cookie is missing, expired, or revoked.' })
  async refresh(
    @Req() request: RequestWithRefreshCookie,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken =
      typeof request.cookies.refresh_token === 'string'
        ? request.cookies.refresh_token
        : '';

    const result = await this.authService.refresh(refreshToken);

    this.setRefreshCookie(response, result.refreshToken);

    return {
      accessToken: result.accessToken,
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiCookieAuth('refresh_token')
  @ApiOperation({ summary: 'Sign out and revoke the refresh token' })
  @ApiOkResponse({ schema: { example: { success: true } } })
  async logout(
    @Req() request: RequestWithRefreshCookie,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken =
      typeof request.cookies.refresh_token === 'string'
        ? request.cookies.refresh_token
        : '';

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
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Request a password-reset email' })
  @ApiOkResponse({ description: 'Always returns a neutral response to prevent account discovery.', schema: { example: { message: 'If the account exists, a password reset email has been sent.' } } })
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto.email);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset a password with a valid token' })
  @ApiOkResponse({ schema: { example: { success: true } } })
  @ApiUnauthorizedResponse({ description: 'Reset token is invalid or expired.' })
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto.token, dto.password);
  }

  @Post('verify-email')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify an email address' })
  @ApiOkResponse({ schema: { example: { success: true } } })
  @ApiUnauthorizedResponse({ description: 'Verification token is invalid or expired.' })
  async verifyEmail(@Body() dto: VerifyEmailDto) {
    return this.authService.verifyEmail(dto.token);
  }
}
