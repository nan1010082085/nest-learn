import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from '../roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from '../entities/roles.entity';

describe('RolesService', () => {
  let service: RolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Roles])],
      providers: [RolesService],
    }).compile();

    service = module.get<RolesService>(RolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
