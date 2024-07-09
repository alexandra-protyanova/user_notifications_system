import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RABBITMQ_QUEUE } from 'src/constants/rabbitMQ';
import { RabbitMQService } from 'src/rabbitMQ/rabbitMQ.service';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const rmqService = app.get<RabbitMQService>(RabbitMQService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: true,
    }),
  );

  app.connectMicroservice(
    rmqService.getOptions(RABBITMQ_QUEUE.SCHEDULER_PRODUCER),
  );

  await app.startAllMicroservices();

  await app.listen(process.env.SCHEDULING_SERVICE_PORT);
}
bootstrap();
