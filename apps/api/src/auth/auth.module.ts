import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { QueuesModule } from '../queues/queues.module';

@Module({
  imports: [ConfigModule, PassportModule, JwtModule.register({}), QueuesModule],

  controllers: [AuthController],

  providers: [AuthService, JwtStrategy],

  exports: [AuthService],
})
export class AuthModule {}
