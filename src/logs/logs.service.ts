import { UserService } from 'src/user/user.service';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Log } from './entities/log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/dto/pagination.dto';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(Log) private readonly logRepository: Repository<Log>,
    private userService: UserService,
  ) {}

  async create(userId: string, dto: Partial<Log>) {
    const user = await this.userService.findOne(userId);
    const newLog = this.logRepository.merge({ user } as Log, dto);
    const logs = this.logRepository.create(newLog);
    return this.logRepository.save(logs);
  }

  findAll() {
    return this.logRepository.find();
  }

  findOne(id: string) {
    return this.logRepository.findOne({ where: { id } });
  }

  async findLogsByUser(userId: string, query: PaginationDto) {
    const user = await this.userService.findOne(userId);

    if (!user) {
      throw new Error('未获取到用户');
    }

    const logsQueryBuilder = this.logRepository
      .createQueryBuilder('log')
      .leftJoinAndSelect('log.user', 'user');

    logsQueryBuilder
      .select('log.id', 'id')
      .addSelect('log.path', 'path')
      .addSelect('log.method', 'method')
      .addSelect('log.result', 'result')
      .addSelect('user.username', 'username');

    const { page, limit } = query;

    const take = limit || 10;
    const skip = ((page || 1) - 1) * take;

    const data = await logsQueryBuilder
      .where('user.id = :id', { id: user.id })
      .take(take)
      .skip(skip)
      .getRawMany();
    return {
      data,
      page: {
        page,
        limit,
        total: await logsQueryBuilder.getCount(),
      },
    };
  }
}
