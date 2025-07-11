import {
  BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostsService } from './posts.service';
import { Auth } from 'src/common/decorators/auth.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { User as UserType } from '@prisma/client';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @Auth()
  @UsePipes(ValidationPipe)
  createPost(@Body() createPostDto: CreatePostDto, @User() user: UserType) {
    return this.postsService.createPost(user.id, createPostDto);
  }

  @Get('foryou')
  @Auth()
  getForYouPosts(@Query('cursor', new DefaultValuePipe(0)) cursor: number) {
    // console.log('Cursor:', cursor);
    // if (!cursor) {
    //   throw new BadRequestException('Cursor is required');
    // }
    return this.postsService.getForYouPosts();
  }

  @Get('following')
  @Auth()
  getFollowingPosts(@User() user: UserType) {
    return this.postsService.getFollowingPosts(user.id);
  }

  @Get('user/:id')
  getUserPosts(@Param('id') id: string) {
    if (!id) {
      throw new BadRequestException('User ID is required');
    }
    return this.postsService.getUserPosts(id);
  }

  @Get(':id')
  getPostById(@Param('id') id: string) {
    if (!id) {
      throw new BadRequestException('Post ID is required');
    }
    return this.postsService.getPostById(id);
  }
}
