import { Injectable } from '@nestjs/common';
import { UpdateLogDto } from './dto/update-log.dto';
import { Repository } from 'typeorm';
import { Log } from './entities/log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { HttpService } from 'src/common/http/http.service';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(Log) private readonly logRepository: Repository<Log>,
    private httpService: HttpService,
  ) {}

  async create(createLogDto: Omit<Log, 'id'>) {
    const logs = this.logRepository.create(createLogDto);
    const Log = await this.logRepository.save(logs);
    return Log.id;
  }

  findAll() {
    return this.logRepository.find();
  }

  findOne(id: string) {
    return this.logRepository.findOne({ where: { id } });
  }

  findLogsByUser(user: User) {
    return this.logRepository.find({
      where: {
        user,
      },
      // relations: {
      //   user: true,
      // },
    });
  }

  update(id: number, updateLogDto: UpdateLogDto) {
    return `This action updates a #${id} log`;
  }

  remove(id: number) {
    return `This action removes a #${id} log`;
  }
}
