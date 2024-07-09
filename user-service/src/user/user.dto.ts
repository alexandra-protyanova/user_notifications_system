import { IsDate, IsNumber, IsString } from 'class-validator';

export class UserCreationDto {
  @IsString()
  name: string;
}

export class UserDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsDate()
  createdAt: Date;
}
