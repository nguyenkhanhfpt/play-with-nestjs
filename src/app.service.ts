import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { DEFAULT_QUEUE_NAME } from '@shared/constants';
import { t } from '@shared/utils';
import { Query } from '@nestjs/graphql';

@Injectable()
export class AppService {
  constructor(@InjectQueue(DEFAULT_QUEUE_NAME) private queue: Queue) {}

  @Query(() => String)
  getHello(): string {
    return t('common.hello');
  }
}
