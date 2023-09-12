import { INestApplication } from '@nestjs/common';
import { useAppFactory } from './appFactory';
import { useUserData } from './useUserData';
import { log } from 'console';

const { init, initDB, cleanup, destroy } = useAppFactory();
const { setDefaultUrl } = useUserData();

let app: INestApplication;

// 用例开始前（每个）
global.beforeEach(async () => {
  app = await init();
  await initDB();

  setDefaultUrl();

  global.app = app;
});

// 用例开始后（每个）
global.afterEach(async () => {
  await cleanup();
  await app.close();
});

// 所有测试用例执行完成 [it]
global.afterAll(async () => {
  await destroy();
});
