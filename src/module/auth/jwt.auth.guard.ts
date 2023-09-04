/**
 * @Author Yang (yang dong nan)
 * @Date 2023年9月4日 13:35:18
 * @LastEditorAuthors yangdongnan
 * @LastDate 2023年9月4日 13:35:18
 * @Description 扩展jwt AuthGuard守卫
 */

import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { DecoratorEnum } from 'src/enum/decorator.enum';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): any {
    // this.reflector 获取指定key的元数据
    const isPublicRoute = this.reflector.getAllAndOverride(
      DecoratorEnum.IS_PUBLIC_ROUTE,
      [context.getHandler(), context.getClass()],
    );

    if (isPublicRoute) {
      return true;
    }

    return super.canActivate(context);
  }
}
