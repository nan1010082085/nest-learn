import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from './entities/roles.entity';
import { In, Repository } from 'typeorm';
import { PaginationDto } from 'src/dto/pagination.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
  ) {}

  async findAll(query: PaginationDto) {
    const roleQueryBuilder = this.rolesRepository.createQueryBuilder('roles');
    const { page, limit } = query;

    const take = limit || 10;
    const skip = ((page || 1) - 1) * take;
    // const [data, total] = await this.rolesRepository.findAndCount({
    //   take: take,
    //   skip: skip,
    // });
    // log(role);

    const data = await roleQueryBuilder.take(take).skip(skip).getMany();
    const total = await roleQueryBuilder.getCount();

    return {
      data,
      page: {
        page,
        limit,
        total,
      },
    };
  }

  findByRolesName(user: User) {
    return this.rolesRepository.find({
      where: {
        name: In(user.roles),
      },
    });
  }
}
