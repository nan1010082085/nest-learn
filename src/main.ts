import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setup } from './setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setup(app);
  // 监听端口号
  const port = 3038;
  await app.listen(port);
}
bootstrap();
