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
import { QueryUserDto, validateQuery } from './dto/get-user.dto';
import { TypeormFilter } from '../../filter/typeorm.filter';
import { HttpService } from '../../common/http/http.service';
import { PaginationPipe } from '../../pipes/pagination.pipe';
import { UserGuard } from '../../guards/user.guard';
import { RoleGuard } from './../../guards/role.guard';
import { RoleValidator } from './../../decorator/role-validator.decorator';
import { PublicRoute } from './../../decorator/public-route.decorator';
import { Serialize } from './../../decorator/serialize.decorator';
import { UserDto } from './dto/user.dto';
import { CreateDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
@RoleValidator(6)
@UseGuards(RoleGuard)
@UseFilters(new TypeormFilter())
export class UserController {
  constructor(
    private readonly httpService: HttpService,
    private readonly userService: UserService,
  ) {}

  // params by pipe PaginationPipe 转换输入分页参数 String to Number
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

  // Interceptor 转换响应 Dto 通过 plainToInstance form class-transformer
  // Guard 验证用户是否是自己
  @Get(':id')
  @Serialize(UserDto)
  @UseGuards(UserGuard)
  async getUserById(@Param('id') id: string) {
    const data = await this.userService.findOne(id);
    if (data) {
      return this.httpService.result(HttpStatus.OK, '请求成功', data);
    }
    throw new NotFoundException('未找到对应数据');
  }

  // 允许任何非用户创建用户
  @PublicRoute()
  @Post('create')
  async createUser(@Body() user: CreateDto) {
    const result = await this.userService.create(user);
    let data = null;
    if (result.id) data = result.id;
    return this.httpService.result(HttpStatus.OK, '操作成功', data);
  }

  // Guard 校验用户是否是自己
  // Dto 输入校验指定字段传输
  @UseGuards(UserGuard)
  @Put('update/:id')
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    try {
      await this.userService.update(id, dto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return this.httpService.result(HttpStatus.OK, '操作成功');
  }

  @Delete('delete')
  async deleteUser(@Query('id') id: string) {
    try {
      await this.userService.remove(id);
      return this.httpService.result(HttpStatus.OK, '操作成功');
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
