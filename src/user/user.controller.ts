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
import { User } from 'src/user/entities/user.entity';
import * as Joi from 'joi';
import { HttpResultCode } from 'src/enum/http.enum';
import { UserErrorMessage } from './user.message';

const SUCCESS = HttpResultCode.SUCCESS;
const BODY_ERROR = HttpResultCode.BODY_ERROR;
const PARAMS_ERROR = HttpResultCode.PARAMS_ERROR;

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
      return this.httpService.result(SUCCESS, '请求成功', data);
    }
    const data = await this.userService.findAll();
    return this.httpService.result(
      SUCCESS,
      '请求成功',
      data.map((user) => ({
        id: user.id,
        name: user.username,
      })),
    );
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const data = await this.userService.findOne(id);
    let res = null;
    if (data) {
      res = {
        id: data.id,
        name: data.username,
      };
    }
    return this.httpService.result(SUCCESS, '请求成功', res);
  }

  @Post('create')
  async createUser(@Body() user: User) {
    // Joi校验数据完整性
    const schema = Joi.object({
      username: Joi.string().empty().required(),
      password: Joi.string().empty().alphanum().min(6).required(),
    });
    try {
      await schema.validateAsync(user);
      const res = await this.userService.add(user);
      return this.httpService.result(SUCCESS, '操作成功', res);
    } catch (err) {
      // 自定义类组合joi err 返回错误信息
      return new UserErrorMessage(this.httpService).text(BODY_ERROR, err);
    }
  }

  @Put('update/:id')
  async updateUser(@Param('id') id: string, @Body() user: Partial<User>) {
    if (!id) this.httpService.result(400, '未传递ID');
    if (id) {
      const res = await this.userService.update(+id, user);
      if (res.affected) {
        return this.httpService.result(SUCCESS, '操作成功');
      } else {
        return this.httpService.result(PARAMS_ERROR, '未找到对应的用户ID');
      }
    }
  }

  @Delete('delete')
  async deleteUser(@Query('id') id: string) {
    if (!id) this.httpService.result(400, '未传递ID');
    if (id) {
      const res = await this.userService.remove(id);
      if (res.affected) {
        return this.httpService.result(SUCCESS, '操作成功');
      } else {
        return this.httpService.result(PARAMS_ERROR, '未找到对应的用户ID');
      }
    }
  }

  @Get('profile/:id')
  async findUserProfile(@Param('id') id: string) {
    if (id) {
      const res = await this.userService.findProfile(id);
      return this.httpService.result(SUCCESS, '请求成功', {
        ...res,
        logs_count: Number(res.logs_count),
      });
    }
  }
}
