import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { SchedulerProcessor } from './scheduler.processor';
import { BullModule } from '@nestjs/bullmq';
import { SchedulerController } from 'src/scheduler/scheduler.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QUEUE_NAME } from '../constants/bullMQ';
import { RabbitMQModule } from 'src/rabbitMQ/rabbitMQ.module';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get<string>('REDIS_HOST'),
          port: parseInt(configService.get<string>('REDIS_PORT') || ''),
        },
      }),
      inject: [ConfigService],
    }),

    BullModule.registerQueue({
      name: QUEUE_NAME,
    }),
    RabbitMQModule,
  ],
  controllers: [SchedulerController],
  providers: [SchedulerProcessor, SchedulerService],
})
export class SchedulerModule {}
