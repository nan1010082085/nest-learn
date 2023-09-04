import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { log } from 'console';
import { DecoratorEnum } from '../enum/decorator.enum';
import { UserService } from '../module/user/user.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    protected userService: UserService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 获取controller，路由元数据局@SetMetadata
    const roles = this.reflector.getAllAndOverride(
      DecoratorEnum.ROLE_VALIDATOR,
      [context.getHandler()],
    ) as number[];

    log(roles);

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
