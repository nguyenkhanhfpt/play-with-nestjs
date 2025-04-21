import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);

  // Apply winston logger for app.
  app.useLogger(logger);

  await app.listen(4000);
}
bootstrap();
