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
  NotFoundException,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import * as Joi from 'joi';
import { QueryUserDto, validateQuery } from './dto/get-user.dto';
import { log } from 'console';
import { TypeormFilter } from '../../filter/typeorm.filter';
import { UserErrorMessage } from '../../common/error/error-message';
import { HttpService } from '../../common/http/http.service';
import { User } from './entities/user.entity';
import { PaginationPipe } from '../../pipes/pagination.pipe';
import { UserGuard } from '../../guards/user.guard';

@Controller('user')
@UseFilters(new TypeormFilter())
export class UserController {
  private message = new UserErrorMessage('user');
  constructor(
    private readonly httpService: HttpService,
    private readonly userService: UserService,
  ) {}

  @Get('all')
  async getUserAll(@Query(PaginationPipe) query: QueryUserDto) {
    const schema = validateQuery();
    try {
      await schema.validateAsync(query);
    } catch (err) {
      throw new HttpException('请检查参数', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const { data, page } = await this.userService.findAll(query);
    return this.httpService.result(HttpStatus.OK, '请求成功', data, page);
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
      profile: Joi.any(),
      roles: Joi.any(),
    });
    try {
      await schema.validateAsync(user);
    } catch (err) {
      throw new HttpException(
        this.message.text(err),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const result = await this.userService.create(user);
    let data = null;
    if (result.id) data = result.id;
    return this.httpService.result(HttpStatus.OK, '操作成功', data);
  }

  @UseGuards(UserGuard)
  @Put('update/:id')
  async updateUser(@Param('id') id: string, @Body() dto: User) {
    try {
      const result = await this.userService.update(id, dto);
      log(result);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return this.httpService.result(HttpStatus.OK, '操作成功');
  }

  @Delete('delete')
  async deleteUser(@Query('id') id: string) {
    try {
      const user = await this.userService.remove(id);
      return this.httpService.result(HttpStatus.OK, '操作成功', user.id);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
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
