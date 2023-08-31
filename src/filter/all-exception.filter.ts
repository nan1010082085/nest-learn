import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject,
  LoggerService,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

// import * as requestIp from 'request-ip';
import { QueryFailedError } from 'typeorm';

@Catch()
export class AllExceptionFilter<T> implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  catch(exception: T, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    // 获取上下文
    const ctx = host.switchToHttp();
    // 获取响应
    const response = ctx.getResponse();
    // 获取请求
    const request = ctx.getRequest();
    // 获取状态码
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let msg = exception['message'] || '请求错误';
    let code = 200;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      code = status;
    }

    // 数据库查询错误
    if (exception instanceof QueryFailedError) {
      code = exception.driverError.errno;
      if (code === 1062) {
        msg = '唯一键值重复';
      }
    }

    const responseBody = {
      code,
      // headers: request.headers,
      // query: request.query,
      // body: request.body,
      // param: request.param,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: msg,
      // ip: requestIp.getClientIp(request),
      // exception: exception['name'],
      // error: exception['response'],
    };

    this.logger.error(responseBody.message, responseBody, responseBody.path);

    httpAdapter.reply(response, responseBody, status);
  }
}
