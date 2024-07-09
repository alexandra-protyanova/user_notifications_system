import { Controller, Inject } from '@nestjs/common';
import { RABBITMQ_LABEL } from 'src/constants/rabbitMQ';
import { EventPattern, Payload } from '@nestjs/microservices';
import { WelcomePushNotificationService } from 'src/welcomePushNotification/welcomePushNotification.service';
import { UserDto } from 'src/user/user.dto';
import { WelcomePushMessageDto } from 'src/welcomePushNotification/welcomePushMessage.dto';

@Controller('welcome-push-notification')
export class WelcomePushNotificationController {
  constructor(
    @Inject() private welcomePushService: WelcomePushNotificationService,
  ) {}

  @EventPattern(RABBITMQ_LABEL.USER_CREATED)
  async scheduleWelcomePush(@Payload() user: UserDto): Promise<void> {
    this.welcomePushService.scheduleWelcomePush(user);
  }

  @EventPattern(RABBITMQ_LABEL.SEND_WELCOME_PUSH_NOTIFICATION)
  async sendWelcomePush(
    @Payload() { entityId }: WelcomePushMessageDto,
  ): Promise<void> {
    this.welcomePushService.sendWelcomePush(entityId);
  }
}
