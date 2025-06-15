import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => ({
  environment: process.env.NODE_ENV || 'production',
  databaseUrl: process.env.DATABASE_URL,
  clientUrl: process.env.CLIENT_URL,
  serverUrl: process.env.SERVER_URL,
}));
