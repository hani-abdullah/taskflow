import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, type JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { randomBytes } from 'crypto';

import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { generateSecureToken, hashToken } from './utils/token.util';
import { QueueService } from '../queues/queue.service';
import type { UserRole } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly queueService: QueueService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email.toLowerCase(),
      },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const passwordHash = await argon2.hash(dto.password);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email.toLowerCase(),
        passwordHash,
        firstName: dto.firstName,
        lastName: dto.lastName,
      },
    });

    const verificationToken = await this.createEmailVerificationToken(user.id);

    console.log(`Email verification token: ${verificationToken}`);

    await this.queueService.sendEmail({
      to: user.email,
      subject: 'Welcome to our app',
      html: `
        <h1>Welcome!</h1>
        <p>Your account is ready.</p>
      `,
    });

    return this.createAuthResponse(user.id, user.email, user.role);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email.toLowerCase(),
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const validPassword = await argon2.verify(user.passwordHash, dto.password);

    if (!validPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.createAuthResponse(user.id, user.email, user.role);
  }

  async getCurrentUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }

  private async createAuthResponse(
    userId: string,
    email: string,
    role: UserRole,
  ) {
    const accessToken = await this.jwtService.signAsync(
      {
        sub: userId,
        email,
        role,
        type: 'access',
      },
      {
        secret: this.config.getOrThrow<string>('JWT_ACCESS_SECRET'),
        expiresIn: this.config.get<NonNullable<JwtSignOptions['expiresIn']>>(
          'JWT_ACCESS_EXPIRES_IN',
          '15m',
        ),
      },
    );

    const refreshToken = randomBytes(64).toString('hex');

    const refreshTokenHash = await argon2.hash(refreshToken);

    const expiresAt = new Date();

    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.prisma.session.create({
      data: {
        userId,
        tokenHash: refreshTokenHash,
        expiresAt,
      },
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token missing');
    }

    const sessions = await this.prisma.session.findMany({
      where: {
        revokedAt: null,
        expiresAt: {
          gt: new Date(),
        },
      },
      include: {
        user: true,
      },
    });

    let matchedSession: (typeof sessions)[number] | undefined;

    for (const session of sessions) {
      const valid = await argon2.verify(session.tokenHash, refreshToken);

      if (valid) {
        matchedSession = session;
        break;
      }
    }

    if (!matchedSession) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    await this.prisma.session.update({
      where: {
        id: matchedSession.id,
      },
      data: {
        revokedAt: new Date(),
      },
    });

    return this.createAuthResponse(
      matchedSession.user.id,
      matchedSession.user.email,
      matchedSession.user.role,
    );
  }
  async logout(refreshToken: string) {
    if (!refreshToken) {
      return;
    }

    const sessions = await this.prisma.session.findMany({
      where: {
        revokedAt: null,
      },
    });

    for (const session of sessions) {
      const valid = await argon2.verify(session.tokenHash, refreshToken);

      if (valid) {
        await this.prisma.session.update({
          where: {
            id: session.id,
          },
          data: {
            revokedAt: new Date(),
          },
        });

        break;
      }
    }
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });

    // Don't reveal whether the email exists.
    if (!user) {
      return {
        success: true,
      };
    }

    const token = generateSecureToken();
    const tokenHash = hashToken(token);

    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    await this.prisma.passwordResetToken.deleteMany({
      where: {
        userId: user.id,
        usedAt: null,
      },
    });

    await this.prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt,
      },
    });

    // Email service comes in the next phase.
    console.log(`Password reset token for development: ${token}`);

    return {
      success: true,
    };
  }

  async resetPassword(token: string, newPassword: string) {
    const tokenHash = hashToken(token);

    const resetToken = await this.prisma.passwordResetToken.findUnique({
      where: {
        tokenHash,
      },
      include: {
        user: true,
      },
    });

    if (!resetToken || resetToken.usedAt || resetToken.expiresAt < new Date()) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const passwordHash = await argon2.hash(newPassword);

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: {
          id: resetToken.userId,
        },
        data: {
          passwordHash,
        },
      }),

      this.prisma.passwordResetToken.update({
        where: {
          id: resetToken.id,
        },
        data: {
          usedAt: new Date(),
        },
      }),

      this.prisma.session.updateMany({
        where: {
          userId: resetToken.userId,
          revokedAt: null,
        },
        data: {
          revokedAt: new Date(),
        },
      }),
    ]);

    return {
      success: true,
    };
  }

  async createEmailVerificationToken(userId: string) {
    const token = generateSecureToken();
    const tokenHash = hashToken(token);

    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await this.prisma.emailVerificationToken.deleteMany({
      where: {
        userId,
        usedAt: null,
      },
    });

    await this.prisma.emailVerificationToken.create({
      data: {
        userId,
        tokenHash,
        expiresAt,
      },
    });

    return token;
  }

  async verifyEmail(token: string) {
    const tokenHash = hashToken(token);

    const verificationToken =
      await this.prisma.emailVerificationToken.findUnique({
        where: {
          tokenHash,
        },
      });

    if (
      !verificationToken ||
      verificationToken.usedAt ||
      verificationToken.expiresAt < new Date()
    ) {
      throw new BadRequestException('Invalid or expired verification token');
    }

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: {
          id: verificationToken.userId,
        },
        data: {
          emailVerifiedAt: new Date(),
        },
      }),

      this.prisma.emailVerificationToken.update({
        where: {
          id: verificationToken.id,
        },
        data: {
          usedAt: new Date(),
        },
      }),
    ]);

    return {
      success: true,
    };
  }
}
