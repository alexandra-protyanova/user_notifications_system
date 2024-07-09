import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from 'src/user/user.service';
import { User } from '../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMQModule } from 'src/rabbitMQ/rabbitMQ.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RabbitMQModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
