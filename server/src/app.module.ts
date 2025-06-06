import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import envValidator from './config/env.validation';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    PostsModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV.trim()}`,
      load: [appConfig],
      validationSchema: envValidator,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
