import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });

  app.use(cookieParser());
  app.use(helmet());

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: process.env.WEB_URL ?? 'http://localhost:3000',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('TaskFlow API')
    .setDescription('Complete REST API for TaskFlow projects, tasks, authentication, notifications, and billing. Authenticate with the access token returned by login or registration.')
    .setVersion('1.0.0')
    .addServer(`http://localhost:${process.env.PORT ?? 3001}`, 'Local development')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT', description: 'Paste the access token only.' }, 'access-token')
    .addCookieAuth('refresh_token', { type: 'apiKey', in: 'cookie', description: 'Secure refresh token cookie set by the auth endpoints.' })
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'TaskFlow API Docs',
    swaggerOptions: { persistAuthorization: true, displayRequestDuration: true, filter: true, tryItOutEnabled: true },
    jsonDocumentUrl: 'api/docs-json',
  });

  const port = process.env.PORT ?? 3001;

  await app.listen(port);

  console.log(`API running on http://localhost:${port}/api`);
  console.log(`Swagger: http://localhost:${port}/api/docs`);
}

void bootstrap();
