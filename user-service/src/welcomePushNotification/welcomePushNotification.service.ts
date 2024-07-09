import { Inject, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { RABBITMQ_LABEL } from 'src/constants/rabbitMQ';
import { Payload } from '@nestjs/microservices';
import { UserService } from 'src/user/user.service';
import { RabbitMQService } from 'src/rabbitMQ/rabbitMQ.service';
import { WELCOME_PUSH_NOTIFICATION_DELAY } from 'src/constants/welcomePushNotification';
import { PushNotification } from 'src/welcomePushNotification/welcomeOushNotifications.typedefs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WelcomePushNotificationService {
  constructor(
    private readonly configService: ConfigService,
    @Inject() private rabbitClient: RabbitMQService,
    @Inject() private readonly userService: UserService,
  ) {}

  async scheduleWelcomePush(@Payload() user: User): Promise<void> {
    this.rabbitClient.emitScheduleMessage<{ entityId: number }>({
      label: RABBITMQ_LABEL.SEND_WELCOME_PUSH_NOTIFICATION,
      delay: WELCOME_PUSH_NOTIFICATION_DELAY,
      payload: {
        entityId: user.id,
      },
    });
  }

  async sendWelcomePush(@Payload() userId: number): Promise<void> {
    const user = await this.userService.getUserById(userId);

    this.rabbitClient.emitNotificationMessage<PushNotification>({
      label: RABBITMQ_LABEL.SEND_PUSH_NOTIFICATION,
      payload: {
        id: `welcome-push-user-${user.id}`,
        message: `Welcome to our platform, ${user.name}!`,
        destination: this.configService.get<string>(
          'PUSH_NOTIFICATION_DESTINATION',
        ),
      },
    });
  }
}
