import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './filter/all-exception.filter';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 设置Api全局前缀
  app.setGlobalPrefix('api/v1');

  // 获取http adapter 实例
  const httpAdapterHost = app.get(HttpAdapterHost);

  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);

  app.useLogger(logger);

  app.useGlobalFilters(new AllExceptionFilter(httpAdapterHost, logger));

  // 监听端口号
  await app.listen(3038);
}
bootstrap();
