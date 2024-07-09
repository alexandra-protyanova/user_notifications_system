import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { RABBITMQ_LABEL } from 'src/constants/rabbitMQ';
import { SchedulerDto } from 'src/scheduler/scheduler.dto';
import { SchedulerService } from 'src/scheduler/scheduler.service';

@Controller('scheduler')
export class SchedulerController {
  constructor(private readonly schedulingService: SchedulerService) {}

  @EventPattern(RABBITMQ_LABEL.SCHEDULE_TASK)
  async addJob(@Payload() data: SchedulerDto) {
    const { payload, delay, label } = data;
    await this.schedulingService.scheduleTask({ payload, delay, label });
  }
}
