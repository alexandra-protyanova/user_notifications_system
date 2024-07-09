import { Module } from '@nestjs/common';
import { RabbitMQModule } from 'src/rabbitMQ/rabbitMQ.module';
import { UserModule } from 'src/user/user.module';
import { WelcomePushNotificationController } from 'src/welcomePushNotification/welcomePushNotification.controller';
import { WelcomePushNotificationService } from 'src/welcomePushNotification/welcomePushNotification.service';

@Module({
  imports: [UserModule, RabbitMQModule],
  providers: [WelcomePushNotificationService],
  exports: [WelcomePushNotificationService],
  controllers: [WelcomePushNotificationController],
})
export class WelcomePushNotificationModule {}
