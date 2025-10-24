import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserItemDto {
  @ApiProperty({ example: 1, description: 'User ID', type: Number })
  @Expose()
  id: number;

  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the user',
    type: String,
  })
  @Expose()
  name: string;

  @ApiProperty({
    example: 'abc@gmail.com',
    description: 'Email address of the user',
    type: String,
  })
  @Expose()
  email: string;
}

export class GetUserResDto extends UserItemDto {}
