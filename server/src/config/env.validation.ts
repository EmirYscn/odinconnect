import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  DATABASE_URL: Joi.string().required(),
  CLIENT_URL: Joi.string().uri().required(),
  SERVER_URL: Joi.string().uri().required(),
  JWT_SECRET: Joi.string().required(),
});
