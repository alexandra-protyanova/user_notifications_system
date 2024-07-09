import { Body, Controller, Post } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserService } from 'src/user/user.service';
import { UserCreationDto } from 'src/user/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() options: UserCreationDto): Promise<User> {
    return this.userService.createUser(options);
  }
}
