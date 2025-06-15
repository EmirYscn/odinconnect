import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UpdateUserSettingsDto } from './dtos/update-user-settings.dto';
import { UsersInterceptor } from '../common/interceptors/users.interceptor';
import { Auth } from 'src/common/decorators/auth.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { User as UserType } from '@prisma/client';

@Controller('users')
@UseInterceptors(UsersInterceptor)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = await this.userService.getUserById(id);
    if (!user) throw new HttpException('User not found', 404);
    return user;
  }

  @Delete()
  @Auth()
  async deleteUser(@User() user: UserType) {
    return this.userService.deleteUser(user.id);
  }

  @Patch()
  @Auth()
  updateUser(@User() user: UserType, @Body() data: UpdateUserDto) {
    return this.userService.updateUser(user.id, data);
  }

  @Patch('settings')
  @Auth()
  async updateUserSettings(
    @User() user: UserType,
    @Body() data: UpdateUserSettingsDto,
  ) {
    return this.userService.updateUserSettings(user.id, data);
  }
}
