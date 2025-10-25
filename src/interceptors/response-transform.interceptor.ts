import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { Reflector } from '@nestjs/core';

export interface ClassConstructor<T = any> {
  new (...args: any[]): T;
}

export const Serialize = (dto: ClassConstructor) => SetMetadata('dto', dto);

@Injectable()
export class ResponseTransformInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const handler = context.getHandler();
    // Get DTO from metadata if has been set by @Serialize decorator
    const dto = this.reflector.get('dto', handler);

    return next.handle().pipe(
      map((data) => {
        if (dto) {
          data = plainToInstance(dto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true,
          });
        }

        return data;
      }),
    );
  }
}
