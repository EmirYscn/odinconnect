import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { encodePassword } from 'src/auth/utils/bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput) {
    const existingEmail = await this.getUserByEmail(data.email);
    if (existingEmail) {
      throw new HttpException('Email already exists', 400);
    }

    const existingUsername = await this.getUserByUsername(data.username);
    if (existingUsername) {
      throw new HttpException('Username already exists', 400);
    }

    const password = encodePassword(data.password as string);

    return this.prisma.user.create({
      data: {
        ...data,
        password,
        userSettings: { create: { notifications: true } },
      },
    });
  }

  getUsers() {
    return this.prisma.user.findMany({
      where: { deletedAt: null },
    });
  }

  getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        userSettings: { select: { notifications: true } },
      },
    });
  }

  getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async getUserByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput) {
    const existingUser = await this.getUserById(id);
    if (!existingUser) {
      throw new HttpException('User not found', 404);
    }

    if (data.username) {
      const existingUser = await this.prisma.user.findUnique({
        where: { username: data.username as string },
      });

      if (existingUser) {
        throw new HttpException('Username already exists', 400);
      }
    }
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: string) {
    const foundUser = await this.getUserById(id);
    if (!foundUser) {
      throw new HttpException('User not found', 404);
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async updateUserSettings(
    userId: string,
    data: Prisma.UserSettingsUpdateInput,
  ) {
    const foundUser = await this.getUserById(userId);
    if (!foundUser) {
      throw new HttpException('User not found', 404);
    }
    if (!foundUser.userSettings) {
      throw new BadRequestException('User settings not found');
    }
    return this.prisma.userSettings.update({
      where: { userId },
      data,
    });
  }
}
