/**
 * @Author Yang (yang dong nan)
 * @Date 2023年9月5日 16:00:45
 * @LastEditorAuthors yangdongnan
 * @LastDate 2023年9月5日 16:00:45
 * @Description 转换class-transformer.plainToInstance暴露的实体
 */

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { log } from 'console';
import { Observable, map } from 'rxjs';
import { ClassConstructor, plainToInstance } from 'class-transformer';

@Injectable()
export class SerializeInterceptor<T extends ClassConstructor<unknown>>
  implements NestInterceptor
{
  /**
   * 拦截响应原始数据的返回值
   * @param names 被过滤_id的属性名， 会自动`${name}_id`拼接
   * @param omits 被过滤包含字段的属性名 args.includes(omit)
   */
  constructor(private dto: T) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // const http = context.switchToHttp();
    return next.handle().pipe(
      map((res) => {
        // res.data = this.transform(res.data);
        const { code, message } = res;
        log(res.data);
        const data = plainToInstance(this.dto, res.data, {
          // 只返回expose暴露的字段
          // excludeExtraneousValues: true,
        });
        log('data', data);
        return {
          code,
          message,
          data,
        };
      }),
    );
  }
}
