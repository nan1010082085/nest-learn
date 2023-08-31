import { Injectable } from '@nestjs/common';
import { GetUserDto } from 'src/user/dto/get-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  login(dto: GetUserDto) {
    const { username, password } = dto;
    return { username, password };
  }

  logout(dto: any) {
    return dto;
  }
}
