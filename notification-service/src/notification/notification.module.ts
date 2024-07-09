import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from 'src/notification/notification.controller';

@Module({
  providers: [NotificationService],
  controllers: [NotificationController],
})
export class NotificationModule {}
