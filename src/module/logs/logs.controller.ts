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
} from '@nestjs/common';
import { LogsService } from './logs.service';
import { CreateLogDto } from './dto/create-log.dto';
import { HttpService } from 'src/common/http/http.service';
import { Log } from './entities/log.entity';
import { PaginationDto } from 'src/dto/pagination.dto';
import { PaginationPipe } from 'src/pipes/pagination.pipe';

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

  // PaginationPipe 校验传入的 pagination参数
  @Get()
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
