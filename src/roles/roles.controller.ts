import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { PaginationDto } from 'src/dto/pagination.dto';
import { HttpService } from 'src/common/http/http.service';
import { transformPaginationDto } from 'src/utils/query.typorm';

@Controller('roles')
export class RolesController {
  constructor(
    private readonly httpService: HttpService,
    private readonly rolesService: RolesService,
  ) {}

  @Get()
  async getRoles(@Query() query: PaginationDto) {
    transformPaginationDto(query);
    const { data, page } = await this.rolesService.findAll(query);
    return this.httpService.result(HttpStatus.OK, '请求成功', data, page);
  }
}
