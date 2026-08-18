import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'production')
    .default('development'),

  PORT: Joi.number().default(3001),

  DATABASE_URL: Joi.string().required(),

  JWT_ACCESS_SECRET: Joi.string().min(32).required(),

  JWT_REFRESH_SECRET: Joi.string().min(32).required(),

  JWT_ACCESS_EXPIRES_IN: Joi.string().default('15m'),

  JWT_REFRESH_EXPIRES_IN: Joi.string().default('7d'),

  FRONTEND_URL: Joi.string().uri().required(),

  REDIS_HOST: Joi.string().default('localhost'),

  REDIS_PORT: Joi.number().port().default(6379),

  EMAIL_FROM: Joi.string().email().default('no-reply@example.com'),

  SMTP_HOST: Joi.string().default('127.0.0.1'),

  SMTP_PORT: Joi.number().port().default(1025),

  SMTP_USER: Joi.string().allow('').default(''),

  SMTP_PASSWORD: Joi.string().allow('').default(''),

  SMTP_SECURE: Joi.boolean().default(false),

  STRIPE_SECRET_KEY: Joi.string().allow('').default(''),

  STRIPE_WEBHOOK_SECRET: Joi.string().allow('').default(''),

  STRIPE_PRICE_ID: Joi.string().allow('').default(''),

  STRIPE_SUCCESS_URL: Joi.string()
    .uri()
    .default('http://localhost:3000/billing/success'),

  STRIPE_CANCEL_URL: Joi.string()
    .uri()
    .default('http://localhost:3000/billing/cancel'),
});
