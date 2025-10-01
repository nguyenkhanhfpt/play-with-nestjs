import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { ErrorDto } from './error.dto';

export class BadRequestErrorDto extends ErrorDto {
  @ApiProperty({
    description: 'The field that caused the error',
    example: 'email',
  })
  @Expose()
  readonly field: string;
}
