import { HttpService } from './../common/http/http.service';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Inject,
  LoggerService,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import * as Joi from 'joi';
import { UserErrorMessage } from '../common/error/error-message';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { log } from 'console';
import { GetUserDto, validateQuery } from './dto/get-user.dto';
import { CommonService } from 'src/common/common.service';

@Controller('user')
export class UserController {
  private message = new UserErrorMessage('user');
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private logger: LoggerService,
    private commonService: CommonService,
  ) {}

  @Get('all')
  async getUserAll(@Query() query: GetUserDto) {
    log('getUserAll', query);
    const schema = validateQuery(query);
    try {
      await schema.validateAsync(query);
      const data = await this.userService.findAll(
        // 去除 null
        this.commonService.trimObject<GetUserDto>(query),
      );
      return this.httpService.result(HttpStatus.OK, '请求成功', data);
    } catch (err) {
      throw new HttpException('请检查参数', HttpStatus.INTERNAL_SERVER_ERROR);
    }
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
      return this.httpService.result(HttpStatus.OK, '请求成功', res);
    }
    throw new NotFoundException('未找到对应数据');
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
      return this.httpService.result(HttpStatus.OK, '操作成功', res);
    } catch (err) {
      throw new HttpException(
        this.message.text(err),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('update/:id')
  async updateUser(@Param('id') id: string, @Body() user: Partial<User>) {
    try {
      const res = await this.userService.update(+id, user);
      if (!res.affected) throw new Error(`${res.affected}`);
      return this.httpService.result(HttpStatus.OK, '操作成功');
    } catch (err) {
      throw new HttpException(
        '未找到对应的用户ID',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('delete')
  async deleteUser(@Query('id') id: string) {
    try {
      const res = await this.userService.remove(id);
      if (!res.affected) throw new Error(`${res.affected}`);
      return this.httpService.result(HttpStatus.OK, '操作成功');
    } catch (err) {
      throw new HttpException(
        '未找到对应的用户ID',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('profile/:id')
  async findUserProfile(@Param('id') id: string) {
    if (id) {
      const res = await this.userService.findProfile(id);
      return this.httpService.result(HttpStatus.OK, '请求成功', {
        ...res,
        logs_count: Number(res.logs_count),
      });
    }
  }
}
