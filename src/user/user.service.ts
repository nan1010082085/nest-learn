import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from 'src/common/http/http.service';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find();
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

  async add(user: User) {
    const userTmp = this.userRepository.create(user);
    const USER = await this.userRepository.save(userTmp);
    return USER.id;
  }

  async update(id: number, user: Partial<User>) {
    return this.userRepository.update(id, user);
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }

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
