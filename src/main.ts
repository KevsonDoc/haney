import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Hanei API')
    .setDescription('Hanei API')
    .addBearerAuth({
      type: 'http', // Required: The type of the security scheme. For Bearer auth, this should be 'http'.
      scheme: 'bearer', // Required: The name of the HTTP Authorization scheme to be used in the Authorization header.
      bearerFormat: 'JWT', // Optional: A hint to the client to identify how the bearer token is formatted.
      description: 'Enter JWT token', // Optional: A short description for security scheme.
      name: 'Authorization', // Optional: The name of the header or query parameter to be used.
      in: 'header', // Optional: The location of the API key. Valid values are 'query' or 'header'.
    })
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();
