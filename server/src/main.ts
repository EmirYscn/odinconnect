import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.use(morgan('dev'));
  app.use(helmet());
  app.enableCors({
    origin: configService.get<string>('appConfig.clientUrl'),
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
