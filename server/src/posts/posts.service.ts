import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { EventsGateway } from 'src/events/events.gateway';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventsGateway: EventsGateway,
  ) {}

  async createPost(userId: string, data: Prisma.PostCreateWithoutUserInput) {
    const createdPost = await this.prisma.post.create({
      data: {
        ...data,
        userId,
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
        media: {
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
        media: {
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
        media: {
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
