import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitMQ.service';

@Module({
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {}
