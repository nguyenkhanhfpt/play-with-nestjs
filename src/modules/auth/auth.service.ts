import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from '@modules/auth/dtos/req/login.dto';
import { RegisterDto } from '@modules/auth/dtos/req/register.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@database/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { comparePassword, hashPassword } from '@shared/utils';

/**
 * Auth service
 */
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Login user
   * @param loginDto
   */
  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordMatch = await comparePassword(
      loginDto.password,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    return this.getTokens(user);
  }

  /**
   * Register user
   * @param registerDto
   */
  async register(registerDto: RegisterDto) {
    registerDto.password = await hashPassword(registerDto.password);
    const user = await this.userRepository.save(registerDto);

    return this.getTokens(user);
  }

  logout() {
    console.log('logout');

    return true;
  }

  refresh() {
    console.log('refresh');

    return true;
  }

  /**
   * Generate access and refresh tokens
   * @param user
   */
  async getTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: user.id,
          name: user.name,
          email: user.email,
        },
        {
          secret: this.configService.get<string>('app.jwt.accessSecret'),
          expiresIn: this.configService.get<string>('app.jwt.accessExpiresIn'),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: user.id,
          name: user.name,
          email: user.email,
        },
        {
          secret: this.configService.get<string>('app.jwt.refreshSecret'),
          expiresIn: this.configService.get<string>('app.jwt.refreshExpiresIn'),
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }
}
