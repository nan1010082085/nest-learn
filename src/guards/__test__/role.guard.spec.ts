import { RoleGuard } from '../role.guard';
import { Test, TestingModule } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { UserService } from '../../module/user/user.service';

describe('RoleGuard', () => {
  let service: UserService;
  let reflector: Reflector;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    reflector = module.get<Reflector>(Reflector);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(new RoleGuard(service, reflector)).toBeDefined();
  });
});
