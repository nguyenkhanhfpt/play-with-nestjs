import { IsNotEmpty } from 'class-validator';
import { UserEntity } from '@database/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  public static resource = UserEntity.name;

  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Email of the user',
    example: 'abc@gmail.com',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'P@ssw0rd',
  })
  @IsNotEmpty()
  password: string;
}
