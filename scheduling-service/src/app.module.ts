import { Module } from '@nestjs/common';
import { SchedulerModule } from './scheduler/scheduler.module';
import { RabbitMQModule } from 'src/rabbitMQ/rabbitMQ.module';
import { AppConfigModule } from 'src/config/config.module';

@Module({
  imports: [AppConfigModule, SchedulerModule, RabbitMQModule],
})
export class AppModule {}
