import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { RABBITMQ_QUEUE } from 'src/constants/rabbitMQ';
import { RabbitMQService } from 'src/rabbitMQ/rabbitMQ.service';
import { ValidationPipe } from '@nestjs/common';
import { LoggerService } from 'src/logger/logger.service';

dotenv.config();

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

  app.connectMicroservice(
    rmqService.getOptions(RABBITMQ_QUEUE.SCHEDULER_CONSUMER),
  );
  app.connectMicroservice(rmqService.getOptions(RABBITMQ_QUEUE.USER));

  await app.startAllMicroservices();

  app.useLogger(app.get(LoggerService));

  await app.listen(process.env.USER_SERVICE_PORT);
}
bootstrap();
