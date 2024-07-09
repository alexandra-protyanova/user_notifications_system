import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Inject } from '@nestjs/common';
import { Job } from 'bullmq';
import { QUEUE_NAME } from '../constants/bullMQ';
import { RabbitMQService } from 'src/rabbitMQ/rabbitMQ.service';
import { MQResponse } from 'src/rabbitMQ/rabbitMQ.typedefs';

@Processor(QUEUE_NAME)
export class SchedulerProcessor extends WorkerHost {
  constructor(
    @Inject()
    private rabbitClient: RabbitMQService,
  ) {
    super();
  }

  async process(job: Job<MQResponse<any>>): Promise<void> {
    const { payload, label } = job.data;

    this.rabbitClient.emitMessageToConsumer<any>({ label, payload });
  }
}
