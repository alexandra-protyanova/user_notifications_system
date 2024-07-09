import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { QUEUE_NAME, TASK_NAME } from '../constants/bullMQ';

@Injectable()
export class SchedulerService {
  constructor(@InjectQueue(QUEUE_NAME) private readonly redisClient: Queue) {}
  async scheduleTask({
    payload,
    delay,
    label,
  }: {
    payload: any;
    delay: number;
    label: string;
  }) {
    await this.redisClient.add(TASK_NAME, { payload, label }, { delay });
  }
}
