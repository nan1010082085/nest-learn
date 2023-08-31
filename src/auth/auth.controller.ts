import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dto: CreateDto) {
    return this.authService.login(dto);
  }

  @Post('logout')
  logout(@Body() dto: any) {
    return this.authService.logout(dto);
  }
}
