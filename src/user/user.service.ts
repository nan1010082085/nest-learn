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
    return this.userRepository.findOne({ where: { id } });
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
    return this.userRepository.find({
      where: {
        id,
      },
      relations: {
        profile: true,
      },
    });
  }
}
