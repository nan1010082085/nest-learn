import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/user.service';
import { User } from '../../user/entities/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let mockUserService: Partial<UserService>;
  let mockJwtService: Partial<JwtService>;

  beforeEach(async () => {
    mockUserService = {
      findOneByUsername() {
        return Promise.resolve({
          id: '1',
          username: '1',
          password: '1',
        } as User);
      },
    };
    mockJwtService = {
      sign() {
        return '';
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('Auth Service 实例', () => {
    expect(service).toBeDefined();
  });
});
