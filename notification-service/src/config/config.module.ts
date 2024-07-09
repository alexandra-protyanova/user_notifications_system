import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RABBITMQ_NAME, RABBITMQ_QUEUE } from 'src/constants/rabbitMQ';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.registerAsync({
      clients: [
        {
          name: RABBITMQ_NAME.NOTIFICATION_SERVICE,
          useFactory: (configService: ConfigService) => ({
            transport: Transport.RMQ,
            options: {
              urls: [
                `${configService.get<string>('RABBITMQ_URL')}:${configService.get<string>('RABBITMQ_PORT')}`,
              ],
              queue: RABBITMQ_QUEUE.NOTIFICATION,
              queueOptions: {
                durable: false,
              },
            },
          }),
          inject: [ConfigService],
        },
      ],
      isGlobal: true,
    }),
  ],
})
export class AppConfigModule {}
