import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // ✅ Validation globale
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // Supprime les propriétés non définies dans le DTO
      forbidNonWhitelisted: true, // Erreur si propriété inconnue
      transform: true,            // Transforme le JSON en instance de classe DTO
    }),
  );

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Dynamic Content Management System API')
    .setDescription('API documentation for the DCMS project built with NestJS')
    .setVersion('1.0')
    .addBearerAuth() // Pour les endpoints protégés par JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger accessible à http://localhost:3000/api

  await app.listen(process.env.PORT ?? 3000);
  console.log(` Server running on http://localhost:${process.env.PORT ?? 3000}`);
  console.log(` Swagger documentation on http://localhost:${process.env.PORT ?? 3000}/api`);
}
bootstrap();
