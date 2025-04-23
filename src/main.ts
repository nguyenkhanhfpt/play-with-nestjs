import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { NotFoundExceptionFilter } from '@filters/not-found-exception.filter';
import { LoggerService } from '@modules/logger/logger.service';
import { UnauthorizedExceptionFilter } from '@filters/unauthorized-exception.filter';
import { InternalServerExceptionFilter } from '@filters/internal-server-exception.filter';
import { BadRequestExceptionFilter } from '@filters/bad-request-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  const loggerService = app.get(LoggerService);

  // Apply winston logger for app.
  app.useLogger(logger);

  app.useGlobalFilters(
    new InternalServerExceptionFilter(loggerService),
    new BadRequestExceptionFilter(loggerService),
    new NotFoundExceptionFilter(loggerService),
    new UnauthorizedExceptionFilter(loggerService),
  );

  await app.listen(4000);
}
bootstrap();
