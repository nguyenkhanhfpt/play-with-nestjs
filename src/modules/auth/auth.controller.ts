import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '@modules/auth/dtos/req/login.dto';
import { RegisterDto } from '@modules/auth/dtos/req/register.dto';
import {
  ApiErrorsResponse,
  ApiGetErrorsResponse,
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
import { GetTokenDto, LoginResDto } from './dtos/res/login-res.dto';
import { GetUserResDto } from './dtos/res';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Login', description: 'User login endpoint' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully logged in.',
    type: LoginResDto,
  })
  @ApiBody({ type: LoginDto })
  @ApiErrorsResponse({
    excludeUnauthorized: true,
  })
  async login(@Body() loginDto: LoginDto): Promise<LoginResDto> {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register', description: 'User register endpoint' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully registered.',
    type: LoginResDto,
  })
  @ApiErrorsResponse({
    excludeUnauthorized: true,
  })
  async register(@Body() registerDto: RegisterDto): Promise<LoginResDto> {
    return this.authService.register(registerDto);
  }

  @Get('logout')
  @ApiOperation({ summary: 'Logout', description: 'User logout endpoint' })
  @ApiGetErrorsResponse()
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
  @ApiGetErrorsResponse()
  refresh(@User() user: any) {
    const { refreshToken, email } = user;

    return this.authService.refresh(email, refreshToken);
  }

  @Get('get-user')
  @ApiOperation({
    summary: 'Get current user info',
    description: 'Get current logged in user information',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the current logged in user information.',
    type: GetUserResDto,
  })
  @ApiGetErrorsResponse()
  getUser(@User('id') userId: number): Promise<GetUserResDto> {
    return this.authService.getUser(userId);
  }
}
