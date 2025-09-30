import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { BaseErrorDto } from './base-error.dto';

export class ErrorDto extends BaseErrorDto {
  @ApiProperty({
    description: 'The resource that was not found',
    example: 'userEntity',
    required: false,
  })
  @Expose()
  readonly resource: string;
}
