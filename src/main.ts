import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 设置Api全局前缀
  app.setGlobalPrefix('api/v1');

  // 监听端口号
  await app.listen(3038);
}
bootstrap();
