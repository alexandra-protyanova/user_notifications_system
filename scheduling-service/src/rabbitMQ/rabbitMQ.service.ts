import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RmqOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { MQResponse } from 'src/rabbitMQ/rabbitMQ.typedefs';
import { RABBITMQ_QUEUE } from 'src/constants/rabbitMQ';

@Injectable()
export class RabbitMQService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(RABBITMQ_QUEUE.SCHEDULER_CONSUMER)
    private schedulerConsumer: ClientProxy,
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

  emitMessageToConsumer<Payload>({
    label,
    payload,
  }: MQResponse<Payload>): void {
    this.schedulerConsumer.emit(label, payload);
  }
}
