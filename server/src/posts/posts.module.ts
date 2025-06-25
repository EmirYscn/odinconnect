import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EventsModule } from 'src/events/events.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [PrismaModule, EventsModule, UsersModule],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
