import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class UserGuard implements CanActivate {
  constructor() {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    // 验证update接口传递的params是否和user.userId 一致
    if (req.user.userId === req.params.id) {
      return true;
    }
    throw new UnauthorizedException('传递的用户ID无权限');
  }
}
