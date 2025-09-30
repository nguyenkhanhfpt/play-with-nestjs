import { ApiProperty } from '@nestjs/swagger';

export class GetTokenDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJleGFtcGxlQGdtYWlsLmNvbSIsImlhdCI6MTY4ODUwMDE2NSwiZXhwIjoxNjg4NTg2NTY1fQ.4b8X0nVYd7v3hXHh1vZyWgWqk3fX9v1K3bF8w5Z6kYk',
    description: 'Access token of the user',
    type: String,
  })
  accessToken: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJleGFtcGxlQGdtYWlsLmNvbSIsImlhdCI6MTY4ODUwMDE2NSwiZXhwIjoxNjg4NTg2NTY1fQ.4b8X0nVYd7v3hXHh1vZyWgWqk3fX9v1K3bF8w5Z6kYk',
    description: 'Refresh token of the user',
    type: String,
  })
  refreshToken: string;
}

export class LoginResDto extends GetTokenDto {}
