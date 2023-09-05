import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './filter/all-exception.filter';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 设置Api全局前缀
  app.setGlobalPrefix('api/v1');

  // 获取http adapter 实例
  const httpAdapterHost = app.get(HttpAdapterHost);

  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);

  app.useLogger(logger);

  // 全局管道
  app.useGlobalPipes(
    new ValidationPipe({
      // 去除类上不存在的字段
      whitelist: true,
    }),
  );

  app.useGlobalFilters(new AllExceptionFilter(httpAdapterHost, logger));

  // 监听端口号
  await app.listen(3038);
}
bootstrap();
