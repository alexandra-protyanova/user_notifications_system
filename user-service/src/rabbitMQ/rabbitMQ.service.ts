import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RmqOptions, Transport } from '@nestjs/microservices';
import { RABBITMQ_LABEL, RABBITMQ_NAME } from '../constants/rabbitMQ';
import { ConfigService } from '@nestjs/config';
import { MQMessage, MQScheduledMessage } from 'src/rabbitMQ/rabbitMQ.typedefs';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class RabbitMQService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(RABBITMQ_NAME.SCHEDULING_SERVICE)
    private schedulerClient: ClientProxy,
    @Inject(RABBITMQ_NAME.USER_SERVICE) private userClient: ClientProxy,
    @Inject(RABBITMQ_NAME.NOTIFICATION_SERVICE)
    private notificationClient: ClientProxy,
    private readonly logger: LoggerService,
  ) {}

  getOptions(queue: string): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [
          `${this.configService.get<string>('RABBITMQ_URL')}:${this.configService.get<string>('RABBITMQ_PORT')}`,
        ],
        queue,
        queueOptions: {
          durable: false,
        },
      },
    };
  }

  emitScheduleMessage<Payload>(message: MQScheduledMessage<Payload>): void {
    this.logger.log(`Emitting schedule message: ${JSON.stringify(message)}`);
    this.schedulerClient.emit(RABBITMQ_LABEL.SCHEDULE_TASK, message);
  }

  emitUserMessage<Payload>({ label, payload }: MQMessage<Payload>): void {
    this.logger.log(`Emitting user message: ${label}`);
    this.userClient.emit(label, payload);
  }

  emitNotificationMessage<Payload>({
    label,
    payload,
  }: MQMessage<Payload>): void {
    this.logger.log(`Emitting notification message: ${label}`);
    this.notificationClient.emit(label, payload);
  }
}
