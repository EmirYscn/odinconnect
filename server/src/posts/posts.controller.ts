import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostsService } from './posts.service';
import { Auth } from 'src/common/decorators/auth.decorator';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @Auth()
  @UsePipes(ValidationPipe)
  createPost(@Body() { userId, ...createPostDto }: CreatePostDto) {
    return this.postsService.createPost(userId, createPostDto);
  }
}
