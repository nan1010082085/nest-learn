import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { PaginationDto } from '../../dto/pagination.dto';
import { HttpService } from '../../common/http/http.service';
import { PaginationPipe } from '../../pipes/pagination.pipe';
import { Serialize } from './../../decorator/serialize.decorator';
import { RoleDto } from './dto/role.dto';

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
}
