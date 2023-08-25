import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // 全局是否开启日志， 默认 true
    logger: ['log', 'error', 'warn'],
  });

  // 设置Api全局前缀
  app.setGlobalPrefix('api/v1');

  app.useGlobalFilters(new HttpExceptionFilter());

  // 监听端口号
  await app.listen(3038);
}
bootstrap();
