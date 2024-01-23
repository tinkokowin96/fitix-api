import { Test, TestingModule } from '@nestjs/testing';
import { SuperAdminController } from './super_admin.controller';
import { SuperAdminService } from './super_admin.service';

describe('SuperAdminController', () => {
  let controller: SuperAdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperAdminController],
      providers: [SuperAdminService],
    }).compile();

    controller = module.get<SuperAdminController>(SuperAdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
