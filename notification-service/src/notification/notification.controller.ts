import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { RABBITMQ_LABEL } from 'src/constants/rabbitMQ';
import { NotificationDto } from 'src/notification/notification.dto';
import { NotificationService } from 'src/notification/notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @EventPattern(RABBITMQ_LABEL.SEND_PUSH_NOTIFICATION)
  send(@Payload() { message, destination }: NotificationDto): Promise<void> {
    return this.notificationService.sendPushNotification(message, destination);
  }
}
