import { Module } from '@nestjs/common';
import { NotificationModule } from './notification/notification.module';
import { RabbitMQModule } from 'src/rabbitMQ/rabbitMQ.module';
import { AppConfigModule } from 'src/config/config.module';

@Module({
  imports: [AppConfigModule, NotificationModule, RabbitMQModule],
})
export class AppModule {}
