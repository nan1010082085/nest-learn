import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // 获取上下文
    const ctx = host.switchToHttp();
    // 获取响应
    const response = ctx.getResponse();
    // 获取请求
    const request = ctx.getRequest();
    // 获取状态码
    const status = exception.getStatus();

    response.status(status).json({
      code: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message || exception.name,
    });
  }
}
