import { Test, TestingModule } from '@nestjs/testing';
import { RolesController } from '../roles.controller';
import { RolesService } from '../roles.service';
import { HttpModule } from '../../../common/http/http.module';
import { HttpService } from '../../../common/http/http.service';

describe('RolesController', () => {
  let controller: RolesController;
  let mockService: Partial<RolesService>;

  beforeEach(async () => {
    mockService = {};

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [
        HttpService,
        {
          provide: RolesService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<RolesController>(RolesController);
  });

  it('Roles Controller 实例', () => {
    expect(controller).toBeDefined();
  });
});
