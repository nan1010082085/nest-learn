/**
 * @Author Yang (yang dong nan)
 * @Date 2023年9月7日 10:38:33
 * @LastEditorAuthors yangdongnan
 * @LastDate 2023年9月7日 10:38:33
 * @Description 数据库查询报错
 */

import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { QueryFailedError, TypeORMError } from 'typeorm';

// 字段 {unique:true}
@Catch(TypeORMError)
export class TypeormFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let code = 500;
    if (exception instanceof QueryFailedError) {
      code = exception.driverError.errno;
    }

    return response.status(500).json({
      code,
      timestamp: new Date().toISOString(),
      message: exception.message,
    });
  }
}
