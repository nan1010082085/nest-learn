import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { PaginationDto } from '../../dto/pagination.dto';
import { HttpService } from '../../common/http/http.service';
import { PaginationPipe } from '../../pipes/pagination.pipe';
import { Serialize } from './../../decorator/serialize.decorator';
import { RoleDto } from './dto/role.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(
    private readonly httpService: HttpService,
    private readonly rolesService: RolesService,
  ) {}

  @Serialize(RoleDto)
  @Get()
  async getRoles(@Query(PaginationPipe) query: PaginationDto) {
    const { data, page } = await this.rolesService.findAll(query);
    return this.httpService.result(HttpStatus.OK, '请求成功', data, page);
  }

  @Post()
  async create(@Body() dto: CreateRoleDto) {
    await this.rolesService.create(dto);
    return this.httpService.result(HttpStatus.OK, '操作成功');
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRoleDto,
  ) {
    await this.rolesService.update(id, dto);
    return this.httpService.result(HttpStatus.OK, '操作成功');
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.rolesService.delete(id);
    return this.httpService.result(HttpStatus.OK, '操作成功');
  }
}
