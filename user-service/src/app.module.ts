import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { Connection } from 'typeorm';
import { AppConfigModule } from 'src/config/config.module';
import { RabbitMQModule } from 'src/rabbitMQ/rabbitMQ.module';
import { WelcomePushNotificationModule } from 'src/welcomePushNotification/welcomePushNotification.module';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [
    AppConfigModule,
    LoggerModule,
    RabbitMQModule,
    UserModule,
    WelcomePushNotificationModule,
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}

  async onModuleInit() {
    await this.connection.runMigrations();
  }
}
