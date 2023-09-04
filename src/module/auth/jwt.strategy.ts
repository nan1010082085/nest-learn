import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigJwtEnum } from 'src/enum/db.enum';
import { log } from 'console';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    protected configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt')[ConfigJwtEnum.SECRET],
    });
  }

  async validate(payload: any) {
    log('jwt strategy = ', payload);
    // const user = this.authService.validatorUser(payload);
    // log('validate', user);
    // if (!user) {
    //   throw new UnauthorizedException('未授权的');
    // }
    return { userId: payload.sub, username: payload.username };
  }
}
