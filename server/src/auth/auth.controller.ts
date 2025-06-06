import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { User as UserType } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { User } from '../common/decorators/user.decorator';
import { UsersInterceptor } from 'src/common/interceptors/users.interceptor';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly ConfigService: ConfigService,
  ) {}

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const user = req.user as UserType;
    const { access_token, user: userData } = this.authService.login(user);

    res.cookie('jwt', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return userData;
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(UsersInterceptor)
  status(@User() user: UserType) {
    return user;
  }
}
