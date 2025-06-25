import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { User as UserType } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { User } from '../common/decorators/user.decorator';
import { UsersInterceptor } from 'src/common/interceptors/users.interceptor';
import { Auth } from 'src/common/decorators/auth.decorator';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { RefreshTokenDto } from './dtos/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly ConfigService: ConfigService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalGuard)
  async login(@Req() req: Request) {
    const user = req.user as UserType;
    const {
      accessToken,
      refreshToken,
      user: userData,
    } = await this.authService.login(user);
    return { userData, accessToken, refreshToken };
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
    return { user };
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  public async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return await this.authService.refreshToken(refreshTokenDto);
  }
}
