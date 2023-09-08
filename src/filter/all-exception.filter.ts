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
import { exceptionMessage } from '../common/message';

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
    let code = HttpStatus.INTERNAL_SERVER_ERROR;
    let msg =
      (exception['response'] && exception['response']['message']) ||
      exception['message'] ||
      '请求错误';

    if (exception instanceof HttpException) {
      code = exception.getStatus();
    }

    // 数据库查询错误
    if (exception instanceof QueryFailedError) {
      const status = exception.driverError.errno;
      if (status === 1062) {
        msg = '唯一键值重复';
      }
    }

    const err = {
      code,
      path: request.url,
      method: request.method,
      message: exceptionMessage(code, msg),
      timestamp: new Date().toISOString(),
      // headers: request.headers,
      // query: request.query,
      // body: request.body,
      // param: request.param,
      // ip: requestIp.getClientIp(request),
      // exception: exception['name'],
      // error: exception['response'],
    };
    const responseBody = err;

    this.logger.error(responseBody.message, responseBody, responseBody.path);

    httpAdapter.reply(response, responseBody, code);
  }
}
