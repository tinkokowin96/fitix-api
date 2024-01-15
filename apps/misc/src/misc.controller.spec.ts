import { Test, TestingModule } from '@nestjs/testing';
import { MiscController } from './misc.controller';
import { MiscService } from './misc.service';

describe('MiscController', () => {
  let miscController: MiscController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MiscController],
      providers: [MiscService],
    }).compile();

    miscController = app.get<MiscController>(MiscController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(miscController.getHello()).toBe('Hello World!');
    });
  });
});
