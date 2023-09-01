import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  login(dto: CreateDto) {
    const { username, password } = dto;
    return { username, password };
  }

  logout(dto: any) {
    return dto;
  }
}
