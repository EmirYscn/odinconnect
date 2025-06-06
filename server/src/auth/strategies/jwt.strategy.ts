import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

type JwtObject = {
  sub: string; // User ID
  email: string; // User email
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    const jwtSecret = configService.get<string>('appConfig.jwtSecret');
    if (!jwtSecret) {
      throw new Error('JWT secret is not defined in environment variables');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: JwtObject): Promise<User> {
    const user = await this.userService.getUserById(payload.sub);
    if (!user) throw new HttpException('Unauthorized', 401);
    return user;
  }
}
