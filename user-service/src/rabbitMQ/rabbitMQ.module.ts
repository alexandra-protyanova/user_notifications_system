import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitMQ.service';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [LoggerModule],
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {}
