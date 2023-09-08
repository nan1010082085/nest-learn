import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from '../roles.service';
import { Repository } from 'typeorm';
import { Roles } from '../entities/roles.entity';

describe('RolesService', () => {
  let service: RolesService;
  let mockRepository: Partial<Repository<Roles>>;

  beforeEach(async () => {
    mockRepository = {};

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: 'RolesRepository',
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<RolesService>(RolesService);
  });

  it('Roles Service 实例', () => {
    expect(service).toBeDefined();
  });
});
