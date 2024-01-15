import { Test, TestingModule } from '@nestjs/testing';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';

describe('ClassController', () => {
  let classController: ClassController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ClassController],
      providers: [ClassService],
    }).compile();

    classController = app.get<ClassController>(ClassController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(classController.getHello()).toBe('Hello World!');
    });
  });
});
