import { RABBITMQ_LABEL } from 'src/constants/rabbitMQ';

export interface MQScheduledMessage<Payload> {
  payload: Payload;
  label: RABBITMQ_LABEL;
  delay: number;
}

export interface MQResponse<Payload> {
  payload: Payload;
  label: RABBITMQ_LABEL;
}
