import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import mariadbDataSource from './database/config/datasource';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Scheduling API')
    .setDescription(
      'API for registering students and teachers and scheduling classes.',
    )
    .setContact(
      'Ian Santos',
      'https://github.com/IanDeSa',
      'contato.iansantos@gmail.com',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await mariadbDataSource
    .initialize()
    .then(() => {
      console.log('Database connection initialized');
    })
    .catch((error) => {
      console.error('Error during Data Source initialization', error);
    });

  const port = process.env.PORT || 3001;
  await app.listen(port);
}
bootstrap();
