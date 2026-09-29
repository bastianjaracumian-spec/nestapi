import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  ValidationPipe,
} from '@nestjs/common';
import helmet from 'helmet';
async function bootstrap() {

  const app = await NestFactory.create(AppModule, {

  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.use(helmet());
  const config =
    new DocumentBuilder()
      .setTitle('Project Base API')
      .setDescription(
        'Documentación de la API',
      )
      .setVersion('1.0')
      .addBearerAuth()
      .build();

  const document =
    SwaggerModule.createDocument(
      app,
      config,
    );

  SwaggerModule.setup(
    'api',
    app,
    document,
  );
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
