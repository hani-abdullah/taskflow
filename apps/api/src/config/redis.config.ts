import { ConfigService } from '@nestjs/config';
import { RedisOptions } from 'ioredis';

export function createRedisConfig(configService: ConfigService): RedisOptions {
  return {
    host: configService.get<string>('REDIS_HOST', 'localhost'),

    port: configService.get<number>('REDIS_PORT', 6379),

    maxRetriesPerRequest: null,
  };
}
