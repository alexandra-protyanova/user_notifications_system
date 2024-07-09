import { Injectable } from '@nestjs/common';
import { RmqOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RabbitMQService {
  constructor(private readonly configService: ConfigService) {}

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
}
