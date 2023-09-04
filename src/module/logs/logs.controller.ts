import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  Req,
  Query,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { LogsService } from './logs.service';
import { CreateLogDto } from './dto/create-log.dto';
import { Log } from './entities/log.entity';
import { HttpService } from '../../common/http/http.service';
import { PaginationDto } from '../../dto/pagination.dto';
import { PaginationPipe } from '../../pipes/pagination.pipe';
import { RoleGuard } from '../../guards/role.guard';
import { RoleValidator } from '../../decorator/role-validator.decorator';

@Controller('logs')
export class LogsController {
  constructor(
    private readonly httpService: HttpService,
    private readonly logsService: LogsService,
  ) {}

  @Post(':id')
  async create(
    @Req() request: Request,
    @Param('id') userId: string,
    @Body() createLogDto: CreateLogDto,
  ) {
    const path = request.url;
    const method = request.method;
    const logSchema: Partial<Log> = Object.assign(
      {
        path,
        method,
      },
      createLogDto,
    );
    const data = await this.logsService.create(userId, logSchema);
    return this.httpService.result(HttpStatus.OK, '操作成功', data);
  }

  @RoleValidator(5)
  @UseGuards(RoleGuard)
  @Get()
  // PaginationPipe 校验传入的 pagination参数
  async findAll(@Query(PaginationPipe) query: PaginationDto) {
    const { data, page } = await this.logsService.findAll(query);
    return this.httpService.result(HttpStatus.OK, '请求成功', data, page);
  }

  @Get('byUser/:userId')
  async getLogsByUser(
    @Query() query: PaginationDto,
    @Param('userId') userId: string,
  ) {
    const _query = query || ({} as PaginationDto);
    try {
      const { data, page } = await this.logsService.findLogsByUser(
        userId,
        _query,
      );
      return this.httpService.result(HttpStatus.OK, '请求成功', data, page);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.logsService.findOne(id);
  }
}
