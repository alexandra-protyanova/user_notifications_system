import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { entities } from 'src/entities';
import { migrations } from 'src/migrations';
import { RABBITMQ_NAME, RABBITMQ_QUEUE } from 'src/constants/rabbitMQ';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities,
        migrations,
        migrationsTableName: 'custom_migrations',
        cli: {
          migrationsDir: 'src/migrations',
        },
      }),
      inject: [ConfigService],
    }),
    ClientsModule.registerAsync({
      clients: [
        {
          name: RABBITMQ_NAME.SCHEDULING_SERVICE,
          useFactory: (configService: ConfigService) => ({
            transport: Transport.RMQ,
            options: {
              urls: [
                `${configService.get<string>('RABBITMQ_URL')}:${configService.get<string>('RABBITMQ_PORT')}`,
              ],
              queue: RABBITMQ_QUEUE.SCHEDULER_PRODUCER,
              queueOptions: {
                durable: false,
              },
            },
          }),
          inject: [ConfigService],
        },
        {
          name: RABBITMQ_NAME.USER_SERVICE,
          useFactory: (configService: ConfigService) => ({
            transport: Transport.RMQ,
            options: {
              urls: [
                `${configService.get<string>('RABBITMQ_URL')}:${configService.get<string>('RABBITMQ_PORT')}`,
              ],
              queue: RABBITMQ_QUEUE.USER,
              queueOptions: {
                durable: false,
              },
            },
          }),
          inject: [ConfigService],
        },
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
