import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { log } from 'console';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuth() {
    return 'test auth api successful';
  }

  @Post('login')
  login(@Body() dto) {
    log('auth login', dto);
    const { username, password } = dto;
    return this.authService.login(username, password);
  }

  @Post('logout')
  logout(@Body() dto: any, @Headers() headers) {
    log(headers);
    return this.authService.logout(dto);
  }
}
