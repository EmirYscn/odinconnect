import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { EventsGateway } from 'src/events/events.gateway';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventsGateway: EventsGateway,
    private readonly usersService: UsersService, // Assuming you have a UsersService for user-related operations
  ) {}

  async createPost(userId: string, data: Prisma.PostCreateWithoutUserInput) {
    // Validate user exists
    const user = await this.usersService.getUserById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const createdPost = await this.prisma.post.create({
      data: {
        ...data,
        userId: user.id, // Ensure the post is associated with the correct user
      },
    });

    this.eventsGateway.broadcastToAll('post:created', createdPost);

    return createdPost;
  }

  getFeedPosts() {
    return this.prisma.post.findMany({
      where: {
        published: true,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
        medias: {
          select: {
            id: true,
            url: true,
            type: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getFollowingPosts(userId: string) {
    // 1. Get the IDs of users the current user is following
    const following = await this.prisma.userFollowing.findMany({
      where: {
        followerId: userId,
      },
      select: {
        followingId: true,
      },
    });

    const followingIds = following.map((f) => f.followingId);

    // 2. Get posts from those users
    return this.prisma.post.findMany({
      where: {
        userId: {
          in: followingIds,
        },
        published: true,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
        medias: {
          select: {
            id: true,
            url: true,
            type: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getPostById(id: string) {
    return this.prisma.post.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
        medias: {
          select: {
            id: true,
            url: true,
            type: true,
          },
        },
      },
    });
  }
}
