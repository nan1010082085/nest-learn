import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DecoratorEnum } from '../enum/decorator.enum';
import { UserService } from '../module/user/user.service';
import { notValidateByRole } from '../utils/rules';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    protected userService: UserService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const className = context.getClass().name;
    const handlerName = context.getHandler().name;
    // 不验证的控制器路由
    if (notValidateByRole(className, handlerName)) {
      return true;
    }

    const isPublic = this.reflector.getAllAndOverride(
      DecoratorEnum.IS_PUBLIC_ROUTE,
      [
        // 路由名
        context.getHandler(),
        // 模块名
        context.getClass(),
      ],
    );
    if (isPublic) return true;

    // 获取controller，路由元数据局@SetMetadata
    const roles =
      (this.reflector.getAllAndOverride(DecoratorEnum.ROLE_VALIDATOR, [
        // 路由级别
        context.getHandler(),
        // 控制器级别
        context.getClass(),
      ]) as number[]) || [];

    const req = context.switchToHttp().getRequest();
    if (req.user) {
      // 查询当前用户是否有权限
      const user = await this.userService.findOneRoleOfUser(req.user.userId);
      if (
        user.roles &&
        user.roles instanceof Array &&
        user.roles.some((role) => roles.includes(role.id))
      ) {
        return true;
      }
    }

    return false;
  }
}
