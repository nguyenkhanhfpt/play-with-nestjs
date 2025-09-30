import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class BaseErrorDto {
  @ApiProperty({
    description: 'A short error code',
    example: 'UNAUTHORIZED',
  })
  @Expose()
  code: string;

  @ApiProperty({
    description: 'A human-readable error message',
    example: 'Unauthorized',
    required: false,
  })
  @Expose()
  message?: string;
}
