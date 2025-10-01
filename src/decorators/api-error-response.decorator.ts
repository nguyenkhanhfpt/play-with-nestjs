import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BadRequestErrorDto } from '@shared/dtos/bad-request-error.dto';
import { BaseErrorDto } from '@shared/dtos/base-error.dto';
import { ErrorDto } from '@shared/dtos/error.dto';
import { InternalServerErrorDto } from '@shared/dtos/internal-server-error.dto';

interface ApiErrorsResponseOptions {
  excludeBadRequest?: boolean;
  excludeUnauthorized?: boolean;
  excludeNotFound?: boolean;
  excludeInternalServerError?: boolean;
}

export function ApiErrorsResponse(
  options: ApiErrorsResponseOptions = {},
): MethodDecorator {
  const decorators = [];

  if (!options.excludeBadRequest) {
    decorators.push(
      ApiBadRequestResponse({
        description: 'Bad Request',
        type: BadRequestErrorDto,
      }),
    );
  }

  if (!options.excludeInternalServerError) {
    decorators.push(
      ApiInternalServerErrorResponse({
        description: 'Internal Server Error',
        type: InternalServerErrorDto,
      }),
    );
  }

  if (!options.excludeUnauthorized) {
    decorators.push(
      ApiUnauthorizedResponse({
        description: 'Unauthorized',
        type: BaseErrorDto,
      }),
    );
  }

  if (!options.excludeNotFound) {
    decorators.push(
      ApiNotFoundResponse({
        description: 'Not Found',
        type: ErrorDto,
      }),
    );
  }

  return applyDecorators(...decorators);
}

export function ApiGetErrorsResponse() {
  return ApiErrorsResponse({ excludeBadRequest: true });
}
