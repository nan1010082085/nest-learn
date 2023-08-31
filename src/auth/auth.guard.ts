import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { log } from 'console';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    log('Guard', context);
    return true;
  }
}
