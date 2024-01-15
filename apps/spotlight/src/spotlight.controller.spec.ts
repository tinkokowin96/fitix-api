import { Test, TestingModule } from '@nestjs/testing';
import { SpotlightController } from './spotlight.controller';
import { SpotlightService } from './spotlight.service';

describe('SpotlightController', () => {
  let spotlightController: SpotlightController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SpotlightController],
      providers: [SpotlightService],
    }).compile();

    spotlightController = app.get<SpotlightController>(SpotlightController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(spotlightController.getHello()).toBe('Hello World!');
    });
  });
});
