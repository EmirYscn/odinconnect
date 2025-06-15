import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { User } from '@prisma/client';

import { JwtObject } from 'src/common/types/jwt';
import { AuthenticatedSocket } from 'src/events/types/socket';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (context.getType() !== 'ws') {
      return true;
    }

    const client: AuthenticatedSocket = context.switchToWs().getClient();

    await WsJwtGuard.validateToken(client, this.jwtService, this.usersService);

    return true;
  }
  static async validateToken(
    socket: AuthenticatedSocket,
    jwtService: JwtService,
    usersService: UsersService,
  ) {
    const { authorization } = socket.handshake.headers;
    const token = authorization?.split(' ')[1];
    if (!token) {
      throw new WsException('Invalid credentials.');
    }
    try {
      const payload = await jwtService.verifyAsync<JwtObject>(token);
      const user = await usersService.getUserById(payload.sub);
      if (!user) {
        throw new WsException('User not found.');
      }
      socket.user = {
        id: user.id,
        email: user.email,
        username: user.username,
      } as User;
    } catch {
      throw new WsException('Invalid credentials.');
    }
  }
}
