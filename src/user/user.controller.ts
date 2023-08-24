import { HttpService } from './../common/http/http.service';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { User } from 'src/db/entity/user.entity';
import { log } from 'console';
import * as Joi from 'joi';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  @Get('all')
  async getUserAll(@Query('username') username?: string) {
    if (username) {
      const data = await this.userService.find(username);
      return this.httpService.result(200, '请求成功', data);
    }
    const data = await this.userService.findAll();
    return this.httpService.result(200, '请求成功', data);
  }

  @Post('create')
  async createUser(@Body() user: User) {
    log(user);
    const joiObject = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    });
    log(joiObject);

    // if (user.username && user.password) {
    //   const res = await this.userService.add(user);
    //   return this.httpService.result(200, '操作成功', res);
    // }
    // return this.httpService.result(400, '未传递用户名或密码');
  }

  @Put('update/:id')
  async updateUser(@Param('id') id: string, @Body() user: Partial<User>) {
    if (!id) this.httpService.result(400, '未传递ID');
    if (id) {
      const res = await this.userService.update(id, user);
      if (res.affected) {
        return this.httpService.result(200, '操作成功');
      } else {
        return this.httpService.result(200, '未找到对应的用户ID');
      }
    }
  }

  @Delete('delete')
  async deleteUser(@Query('id') id: string) {
    log(id);
    if (!id) this.httpService.result(400, '未传递ID');
    if (id) {
      const res = await this.userService.remove(id);
      if (res.affected) {
        return this.httpService.result(200, '操作成功');
      } else {
        return this.httpService.result(200, '未找到对应的用户ID');
      }
    }
  }
}
