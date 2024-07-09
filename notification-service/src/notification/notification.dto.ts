import { IsString } from 'class-validator';

export class NotificationDto {
  @IsString()
  id: string;

  @IsString()
  message: string;

  @IsString()
  destination: string;
}
