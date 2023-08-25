import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { LogsService } from './logs.service';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { HttpService } from 'src/common/http/http.service';
import { UserService } from 'src/user/user.service';
import { Log } from './entities/log.entity';

@Controller('logs')
export class LogsController {
  constructor(
    private readonly logsService: LogsService,
    private readonly httpService: HttpService,
    private readonly userService: UserService,
  ) {}

  @Post(':id')
  async create(
    @Req() request: Request,
    @Param('id') userId: string,
    @Body() createLogDto: CreateLogDto,
  ) {
    const path = request.url;
    const method = request.method;
    const user = await this.userService.findOne(userId);
    const logSchema: Omit<Log, 'id'> = {
      path,
      method,
      user: user,
      ...createLogDto,
    };
    const data = await this.logsService.create(logSchema);
    return this.httpService.result(HttpStatus.OK, '操作成功', data);
  }

  @Get()
  async findAll() {
    const data = await this.logsService.findAll();
    return this.httpService.result(HttpStatus.OK, '请求成功', data);
  }

  @Get('byUser/:userId')
  async getLogsByUser(@Param('userId') userId: string) {
    const user = await this.userService.findOne(userId);
    const data = await this.logsService.findLogsByUser(user);
    return this.httpService.result(HttpStatus.OK, '请求成功', data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.logsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLogDto: UpdateLogDto) {
    return this.logsService.update(+id, updateLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logsService.remove(+id);
  }
}
