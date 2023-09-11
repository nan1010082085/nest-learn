import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { ForbiddenException } from '@nestjs/common';
import { UserService } from 'src/module/user/user.service';
import { log } from 'console';

describe('AuthController', () => {
  let controller: AuthController;
  let mockAuthService: Partial<AuthService>;
  let mockUserService: any;

  // user list
  let user = [];

  beforeEach(async () => {
    user = [];
    mockUserService = {
      created: (dto) => {
        user.push(dto);
        return Promise.resolve(user);
      },
    };
    mockAuthService = {
      login: (username, pass): Promise<any> => {
        if (!user.find((u) => u.username === username)) {
          throw new ForbiddenException('用户不存在');
        }

        const token = `${username + pass}`;
        return Promise.resolve({ token });
      },
      logout: (dto) => {
        return Promise.resolve(dto);
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  afterEach(() => {
    user = [];
  });

  it('Auth Controller 实例', () => {
    expect(controller).toBeDefined();
  });

  it('Auth route => login', async () => {
    const dto = { username: 1, password: 2 };
    await mockUserService.created(dto);
    const t = await controller.login(dto);

    // login resolve
    expect(t).toBeDefined();
    // token
    expect(t.token).toBe('3');
  });

  it('Auth route => login error', async () => {
    const dto = { username: 1, password: 2 };

    expect(() => controller.login(dto)).toThrow(
      new ForbiddenException('用户不存在'),
    );
  });

  it('Auth on logout', async () => {
    const dto = { username: 1 };
    const headers = {
      req: {
        username: 1,
      },
    };
    const logout = await controller.logout(dto, headers);

    expect(logout).toBeDefined();

    expect(logout).toEqual(logout);

    expect(logout.username).toBe(1);
  });
});
