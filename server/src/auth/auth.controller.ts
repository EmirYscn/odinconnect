import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request, Response } from 'express';
import { User as UserType } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { User } from '../common/decorators/user.decorator';
import { UsersInterceptor } from 'src/common/interceptors/users.interceptor';
import { Auth } from 'src/common/decorators/auth.decorator';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly ConfigService: ConfigService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalGuard)
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const user = req.user as UserType;
    const { access_token, user: userData } = await this.authService.login(user);

    res.cookie('jwt', access_token, {
      httpOnly: true,
      secure: this.ConfigService.get('NODE_ENV') === 'production',
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return userData;
  }

  @Post('signup')
  @UsePipes(ValidationPipe)
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signup(createUserDto);
  }

  @Get('status')
  @Auth()
  @UseInterceptors(UsersInterceptor)
  status(@User() user: UserType) {
    return user;
  }
}
