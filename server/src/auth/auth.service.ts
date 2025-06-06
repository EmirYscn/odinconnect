import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthPayloadDto } from './dtos/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { comparePasswords } from './utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(authPayloadDto: AuthPayloadDto) {
    const { email, password: pass } = authPayloadDto;

    const existingUser = await this.usersService.getUserByEmail(email);

    if (!existingUser || !existingUser.password)
      throw new UnauthorizedException('Invalid credentials');

    const isMatch = comparePasswords(pass, existingUser.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const { password: _, ...userWithoutPassword } = existingUser;
    return userWithoutPassword;
  }

  login(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
      },
    };
  }
}
