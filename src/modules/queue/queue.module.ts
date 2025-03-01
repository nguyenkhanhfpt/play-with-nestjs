import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { QueueProcessor } from '@modules/queue/processors/queue.processor';
import { QueueListener } from '@modules/queue/listeners/queue.listener';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get('app.queue.host'),
          port: configService.get('app.queue.port'),
          password: configService.get('app.queue.password'),
        },
      }),
    }),
  ],
  providers: [QueueProcessor, QueueListener],
})
export class QueueModule {}
