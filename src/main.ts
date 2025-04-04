import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3001;
  await app.listen(port);
}
bootstrap();
