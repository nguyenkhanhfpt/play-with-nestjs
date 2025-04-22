import { Global, Module } from '@nestjs/common';
import { loggerOptionsConstant } from './logger.constant';
import { WinstonModule } from 'nest-winston';

import { LoggerService } from './logger.service';
import { ClsService } from 'nestjs-cls';

@Global()
@Module({
  imports: [
    WinstonModule.forRootAsync({
      imports: [],
      useFactory: () => loggerOptionsConstant,
    }),
  ],
  providers: [LoggerService, ClsService],
  exports: [LoggerService],
})
export class LoggerModule {}
