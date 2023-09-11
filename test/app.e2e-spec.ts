import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { setup } from '../src/setup';
import { log } from 'console';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const prefix = '/api/v1';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    setup(app);
    await app.init();
  });

  const user = {
    username: 'qqqq222',
    password: '1234567',
  };

  const userId = '1cdc7d58-c015-4b8e-a023-c715c64dcc34';

  // it('创建用户 User', () => {
  //   const userRoute = request(app.getHttpServer())
  //     .post(prefix + 'user/create/')
  //     .send(user);
  //   log(userRoute);
  //   return userRoute.expect(200)
  // });

  const getToken = async () => {
    const res = await request(app.getHttpServer())
      .post(prefix + '/auth/login/')
      .send(user);

    return JSON.parse(res.text);
  };

  it('get userId', async () => {
    const t = await getToken();
    const req = request(app.getHttpServer())
      .get(prefix + '/menus/')
      .set('Authorization', 'Bearer ' + t.token);

    return req.expect(200);
  });

  // it('/ (GET)', async () => {
  //   const req = request(app.getHttpServer())
  //     .get(prefix + 'roles/')
  //     .query({ page: 1, limit: 10 });
  //   log(req);
  //   return req.expect(401, (data) => {
  //     log(data)
  //     expect(data.body.message).toBe('Unauthorized');
  //   });
  // });
});
