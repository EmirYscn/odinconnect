import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtObject } from 'src/common/types/jwt';
import { UsersService } from 'src/users/users.service';
import authConfig from '../config/auth.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,
    private readonly userService: UsersService,
  ) {
    const jwtSecret = authConfiguration.secret;
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
