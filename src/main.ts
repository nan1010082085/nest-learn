import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setup } from './setup';
import getConfiguration from './configuration';
import { get } from 'lodash';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setup(app);
  // 监听端口号
  const port = get(getConfiguration('app'), 'port');
  await app.listen(port);
}
bootstrap();
