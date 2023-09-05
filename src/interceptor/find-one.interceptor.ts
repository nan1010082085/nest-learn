import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { log } from 'console';
import { omit } from 'lodash';
import { Observable, map } from 'rxjs';

@Injectable()
export class FindOneInterceptor implements NestInterceptor {
  /**
   * 拦截响应原始数据的返回值
   * @param names 被过滤_id的属性名， 会自动`${name}_id`拼接
   * @param omits 被过滤包含字段的属性名 args.includes(omit)
   */
  constructor(
    private names: string[] = [],
    private omits: string[] = [],
  ) {}

  transform(args: Record<string, unknown>) {
    const keys = Object.keys(args);
    args = omit(
      args,
      ...[
        ...this.names.map((str) => `${str}_id`),
        ...keys.filter((str) => this.omits.some((v) => str.includes(v))),
      ],
    );
    const result = {};
    for (const key in args) {
      const newKey = key.split('_')[1];
      result[newKey] = args[key];
    }
    return result;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // const http = context.switchToHttp();
    return next.handle().pipe(
      map((res) => {
        log(res.data);
        res.data = this.transform(res.data);
        return res;
      }),
    );
  }
}
