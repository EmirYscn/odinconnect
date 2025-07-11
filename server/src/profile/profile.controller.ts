import {
  BadRequestException,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UsersInterceptor } from 'src/common/interceptors/users.interceptor';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':id')
  @UseInterceptors(UsersInterceptor)
  getProfileById(@Param('id') id: string) {
    if (!id) {
      throw new BadRequestException('Profile ID is required');
    }
    return this.profileService.getProfileById(id);
  }
}
