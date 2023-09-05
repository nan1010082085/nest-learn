import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { log } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(username: string, pass: string) {
    const user = await this.userService.findOneByUsername(username);
    if (!user) {
      throw new ForbiddenException('用户不存在');
    }

    const isPassword = await argon2.verify(user.password, pass);
    log(isPassword);
    if (!isPassword) {
      throw new ForbiddenException('用户名或密码错误。');
    }

    return {
      token: this.jwtService.sign({ username: user.username, sub: user.id }),
    };
  }

  logout(dto: any) {
    return dto;
  }
}
