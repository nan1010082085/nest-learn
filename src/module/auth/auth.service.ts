import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { omit } from 'lodash';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validatorUser(
    username: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.userService.findOneByUsername(username);
    if (user && user.password === pass) {
      const result = omit(user, 'password');
      return result;
    }
    return null;
  }

  async login(username: string, pass: string) {
    const user = await this.validatorUser(username, pass);
    if (!user) {
      throw new BadRequestException('该用户不存在');
    }
    return {
      token: this.jwtService.sign({ username: user.username, sub: user.id }),
    };
  }

  logout(dto: any) {
    return dto;
  }
}
