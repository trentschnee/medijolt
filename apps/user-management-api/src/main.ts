import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const globalPrefix = 'api';
  setupOpenApi(app, globalPrefix); // Pass the global prefix to the setup function

  app.setGlobalPrefix(globalPrefix);


  const port = configService.get<number>('port');
  console.log(`Starting server on port: ${port}`);
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

function setupOpenApi(app: INestApplication, globalPrefix: string) {
  const config = new DocumentBuilder()
    .setTitle('User Management API Documentation')
    .setDescription('API documentation for the User Management service')
    .setVersion('1.0')
    .addServer(`/api`) // Add this line to ensure paths are prefixed correctly
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`swagger`, app, document);
}

bootstrap();
