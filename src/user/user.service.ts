import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from 'src/common/http/http.service';
import { User } from 'src/db/entity/user.entity';
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
    const res = this.userRepository.findOne({ where: { username } });
    return res;
  }

  async add(user: User) {
    const userTmp = this.userRepository.create(user);
    const USER = await this.userRepository.save(userTmp);
    return USER.id;
  }

  async update(id: string, user: Partial<User>) {
    return this.userRepository.update(id, user);
  }

  remove(id: string) {
    return this.userRepository.delete(id);
  }
}
