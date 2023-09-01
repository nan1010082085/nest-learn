import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateDto } from '../user/dto/create-user.dto';
import { log } from 'console';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuth() {
    return 'test auth api successful';
  }

  @Post('login')
  login(@Body(new ValidationPipe()) dto: CreateDto) {
    log(dto);
    return this.authService.login(dto);
  }

  @Post('logout')
  logout(@Body() dto: any) {
    return this.authService.logout(dto);
  }
}
