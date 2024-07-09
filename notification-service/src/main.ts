import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RABBITMQ_QUEUE } from 'src/constants/rabbitMQ';
import { RabbitMQService } from 'src/rabbitMQ/rabbitMQ.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: true,
    }),
  );

  const rmqService = app.get<RabbitMQService>(RabbitMQService);

  app.connectMicroservice(rmqService.getOptions(RABBITMQ_QUEUE.NOTIFICATION));

  await app.startAllMicroservices();
}
bootstrap();
