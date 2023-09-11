import { INestApplication } from '@nestjs/common';
import { AllExceptionFilter } from './filter/all-exception.filter';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
export function setup(app: INestApplication) {
  // 设置Api全局前缀
  app.setGlobalPrefix('api/v1');

  // 获取http adapter 实例
  const httpAdapterHost = app.get(HttpAdapterHost);

  // const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);

  // app.useLogger(logger);

  // 全局管道
  app.useGlobalPipes(
    new ValidationPipe({
      // 去除类上不存在的字段
      whitelist: true,
    }),
  );

  app.useGlobalFilters(new AllExceptionFilter(httpAdapterHost, new Logger()));
}
