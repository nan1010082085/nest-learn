import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryUserDto } from './dto/get-user.dto';
import { QueryBuilderTypeORM } from 'src/utils/interaction.typorm';
import { RolesService } from '../roles/roles.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly rolesService: RolesService,
  ) {}

  async findAll(_query: QueryUserDto) {
    const { limit, page, username, ganger } = _query;

    const take = limit || 10;
    const skip = ((page || 1) - 1) * take;

    const userQueryBuilder = this.userRepository.createQueryBuilder('user');

    const queryBuilder = userQueryBuilder
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('user.roles', 'roles');

    const whereObj = {
      'user.username': username,
      'profile.ganger': ganger,
    };

    const _ = new QueryBuilderTypeORM<User>(queryBuilder).whereBuilder(
      whereObj,
    );

    const data = await _.take(take).skip(skip).getMany();
    const total = await _.getCount();

    return {
      data,
      page: {
        page,
        limit,
        total,
      },
    };
  }

  find(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  findOne(id: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
  }

  async create(user: Partial<User>) {
    if (user.roles instanceof Array) {
      user.roles = await this.rolesService.findByRolesName(user);
    }
    const userTmp = this.userRepository.create(user);
    try {
      return await this.userRepository.save(userTmp);
    } catch (err) {
      throw err;
    }
  }

  async update(id: string, dto: User) {
    const userTmp = await this.findOneProfile(id);
    if (!userTmp) {
      throw new Error('无法更新相关profile字段');
    }
    const newUser = this.userRepository.merge(userTmp, dto);
    if (dto.roles instanceof Array) {
      const roles = await this.rolesService.findByRolesName(dto);
      newUser.roles = roles;
    }
    // 更新新的关系实体
    return this.userRepository.save(newUser);
    // 只使用对单个实体进行更新操作
    // return this.userRepository.update(id, user);
  }

  async remove(id: string) {
    // delete 硬删除
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('未找到对应的用户ID');
    }
    const result = await this.userRepository.remove(user);
    return result;
  }

  // 查询携带profile实体的用户数据
  findOneProfile(id: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .where('user.id = :id', { id })
      .getOne();
  }

  // 查询用户详情（原始数据）
  findProfile(id: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndMapOne('user.profile', 'user.profile', 'profile')
      .leftJoinAndSelect('user.logs', 'logs')
      .select('user.id', 'id')
      .addSelect('user.username', 'name')
      .addSelect('profile.gender', 'gender')
      .addSelect('profile.photo', 'photo')
      .addSelect('profile.address', 'address')
      .addSelect('COUNT("user.logs")', 'logs_count')
      .where('user.id = :id', { id })
      .getRawOne();
  }
}
