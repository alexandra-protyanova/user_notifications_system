import { RABBITMQ_LABEL } from 'src/constants/rabbitMQ';

export interface MQMessage<Payload> {
  payload: Payload;
  label: RABBITMQ_LABEL;
}

export interface MQScheduledMessage<Payload> {
  payload: Payload;
  label: RABBITMQ_LABEL;
  delay: number;
}
