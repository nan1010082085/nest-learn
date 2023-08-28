import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './filter/all-exception.filter';
import { HttpException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // 全局是否开启日志， 默认 true
    logger: ['log', 'error', 'warn'],
  });

  // 设置Api全局前缀
  app.setGlobalPrefix('api/v1');

  // 获取http adapter 实例
  const httpAdapterHost = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionFilter<HttpException>(httpAdapterHost));

  // 监听端口号
  await app.listen(3038);
}
bootstrap();
