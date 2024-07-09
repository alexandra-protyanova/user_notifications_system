import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { RABBITMQ_LABEL } from 'src/constants/rabbitMQ';

export class SchedulerDto {
  @IsNotEmpty()
  payload: any;

  @IsString()
  label: RABBITMQ_LABEL;

  @IsNumber()
  delay: number;
}
