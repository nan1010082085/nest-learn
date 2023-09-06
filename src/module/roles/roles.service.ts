import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from './entities/roles.entity';
import { In, Repository } from 'typeorm';
import { PaginationDto } from '../../dto/pagination.dto';
import { User } from '../user/entities/user.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Logger } from '@nestjs/common';

@Injectable()
export class RolesService {
  logger = new Logger();
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

  findByRolesId(user: User) {
    return this.rolesRepository.find({
      where: {
        id: In(user.roles),
      },
    });
  }

  findByRolesName(user: User) {
    return this.rolesRepository.find({
      where: {
        name: In(user.roles),
      },
    });
  }

  create(dto: CreateRoleDto) {
    const roles = this.rolesRepository.create(dto);
    this.logger.log(`创建角色`, dto);
    return this.rolesRepository.save(roles);
  }

  update(id: number, dto: UpdateRoleDto) {
    this.logger.log(`更新角色 ${id}`, dto);
    return this.rolesRepository.update(id, dto);
  }

  delete(id: number) {
    this.logger.log(`删除角色 ${id}`);
    return this.rolesRepository.delete(id);
  }
}
