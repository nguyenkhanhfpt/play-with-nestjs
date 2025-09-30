import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '@modules/auth/dtos/req/login.dto';
import { RegisterDto } from '@modules/auth/dtos/req/register.dto';
import {
  ApiErrorResponse,
  ApiGetErrorResponse,
  Public,
  User,
} from '@decorators';
import { RefreshTokenGuard } from '@guards';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetTokenDto } from './dtos/res/login-res.dto';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Login', description: 'User login endpoint' })
  @ApiBody({ type: LoginDto })
  @ApiErrorResponse({
    excludeUnauthorized: true,
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register', description: 'User register endpoint' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully registered.',
    type: GetTokenDto,
  })
  @ApiErrorResponse({
    excludeUnauthorized: true,
  })
  register(@Body() registerDto: RegisterDto): Promise<GetTokenDto> {
    return this.authService.register(registerDto);
  }

  @Get('logout')
  @ApiOperation({ summary: 'Logout', description: 'User logout endpoint' })
  @ApiGetErrorResponse()
  logout() {
    return 'Logout';
  }

  /**
   * Refresh token
   * @param user
   */
  @Public()
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  @ApiOperation({
    summary: 'Refresh Token',
    description: 'Refresh access token endpoint',
  })
  @ApiResponse({
    status: 200,
    description: 'The access token has been successfully refreshed.',
    type: GetTokenDto,
  })
  @ApiGetErrorResponse()
  refresh(@User() user: any) {
    const { refreshToken, email } = user;

    return this.authService.refresh(email, refreshToken);
  }
}
