import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { HashingProvider } from './provider/hashing.provider';
import authConfig from './config/auth.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly hashingProvider: HashingProvider, // Assuming you have a hashing provider
    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,
  ) {}

  async validateUser(loginDto: LoginDto) {
    const { email, password: pass } = loginDto;

    const existingUser = await this.usersService.getUserByEmail(email);

    if (!existingUser || !existingUser.password)
      throw new UnauthorizedException('Invalid credentials');

    const isMatch = await this.hashingProvider.comparePasswords(
      pass,
      existingUser.password,
    );
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const { password: _, ...userWithoutPassword } = existingUser;
    return userWithoutPassword;
  }

  async login(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
    };

    const token = await this.jwtService.signAsync(payload, {
      secret: this.authConfiguration.secret,
      expiresIn: this.authConfiguration.expiresIn,
      audience: this.authConfiguration.audience,
      issuer: this.authConfiguration.issuer,
    });

    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
      },
    };
  }

  public async signup(createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }
}
