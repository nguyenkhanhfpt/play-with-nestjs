import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app.module';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from '@shared/logger/winston.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig),
  });

  await app.listen(4000);
}
bootstrap();
