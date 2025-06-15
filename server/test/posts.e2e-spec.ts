import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PostsModule } from 'src/posts/posts.module';
import * as request from 'supertest';

describe('PostsController (e2e)', () => {
  let app: INestApplication;
  let jwt: string | undefined;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [PostsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Log in and get JWT (adjust as needed)
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'testuser@test.com', password: 'testpass' });

    const cookie = res.headers['set-cookie'][0];
    jwt = /jwt=([^;]+)/.exec(cookie)?.[1];
  });

  it('/posts/following (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/posts/following')
      .set('Authorization', `Bearer ${jwt}`)
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  afterAll(async () => {
    await app.close();
  });
});
