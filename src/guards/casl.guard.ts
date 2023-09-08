import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import {
  CASL_ABILITY_KEY,
  CanHandlerType,
  PolicyHandlerCallback,
} from '../decorators/casl.decorator';
import CaslAbilityService from '../module/auth/casl-ability.service';
import { InferSubjects } from '@casl/ability';

@Injectable()
export class CaslGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityService: CaslAbilityService<InferSubjects<any>>,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    // [自定义] 单个为=(function),多个为=([function,function])
    const handlers = this.reflector.getAllAndMerge(
      CASL_ABILITY_KEY.PUBLICY_HANDLER,
      [context.getHandler(), context.getClass()],
    ) as PolicyHandlerCallback[];
    // [允许] 单个为=(function),多个为=([function,function])
    const canHandlers = this.reflector.getAllAndMerge(CASL_ABILITY_KEY.CAN, [
      context.getHandler(),
      context.getClass(),
    ]) as CanHandlerType;
    // [不允许] 单个为=(function),多个为=([function,function])
    const cannotHandlers = this.reflector.getAllAndMerge(
      CASL_ABILITY_KEY.CANNOT,
      [context.getHandler(), context.getClass()],
    ) as CanHandlerType;

    if (!handlers && !canHandlers && !cannotHandlers) {
      return true;
    }

    // 将req.user传递casl服务
    if (req.user) {
      const ability = this.caslAbilityService.forRoot(req.user.username);
      let flag = true;
      if (handlers) {
        flag = flag && handlers.every((handle) => handle(ability));
      }
      if (canHandlers) {
        if (canHandlers instanceof Array) {
          flag = flag && canHandlers.every((handle) => handle(ability));
        } else if (typeof canHandlers === 'function') {
          flag = flag && canHandlers(ability);
        }
      }
      if (cannotHandlers) {
        if (cannotHandlers instanceof Array) {
          flag = flag && cannotHandlers.every((handle) => handle(ability));
        } else if (typeof cannotHandlers === 'function') {
          flag = flag && cannotHandlers(ability);
        }
      }
      return flag;
    }
    return false;
  }
}
