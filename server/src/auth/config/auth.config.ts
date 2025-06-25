import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  secret: process.env.JWT_SECRET,
  expiresIn: parseInt(process.env.JWT_EXPIRESIN ?? '3600', 10),
  refreshTokenExpiresIn: parseInt(
    process.env.JWT_REFRESH_TOKEN_EXPIRESIN ?? '604800',
    10,
  ),
  audience: process.env.JWT_AUDIENCE,
  issuer: process.env.JWT_ISSUER,
}));
