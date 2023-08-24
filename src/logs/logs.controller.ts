import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LogsService } from './logs.service';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { HttpService } from 'src/common/http/http.service';
import { HttpResultCode } from 'src/enum/http.enum';
import { UserService } from 'src/user/user.service';

@Controller('logs')
export class LogsController {
  constructor(
    private readonly logsService: LogsService,
    private readonly httpService: HttpService,
    private readonly userService: UserService,
  ) {}

  @Post()
  create(@Body() createLogDto: CreateLogDto) {
    return this.logsService.create(createLogDto);
  }

  @Get()
  async findAll() {
    const data = await this.logsService.findAll();
    return this.httpService.result(HttpResultCode.SUCCESS, '请求成功', data);
  }

  @Get('byUser/:userId')
  async getLogsByUser(@Param('userId') userId: string) {
    const user = await this.userService.findOne(userId);
    const data = await this.logsService.findLogsByUser(user);
    return this.httpService.result(HttpResultCode.SUCCESS, '请求成功', data);
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
