import { IsNumber } from 'class-validator';

export class WelcomePushMessageDto {
  @IsNumber()
  entityId: number;
}
