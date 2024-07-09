import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { RABBITMQ_LABEL } from 'src/constants/rabbitMQ';
import { RabbitMQService } from 'src/rabbitMQ/rabbitMQ.service';
import { UserCreationDto } from 'src/user/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @Inject() private rabbitClient: RabbitMQService,
  ) {}

  async createUser({ name }: UserCreationDto): Promise<User> {
    const user = this.usersRepository.create({ name });
    const savedUser = await this.usersRepository.save(user);

    this.rabbitClient.emitUserMessage<User>({
      label: RABBITMQ_LABEL.USER_CREATED,
      payload: savedUser,
    });

    return savedUser;
  }

  async getUserById(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }
}
