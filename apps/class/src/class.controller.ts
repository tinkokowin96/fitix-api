import { Controller, Get } from '@nestjs/common';
import { ClassService } from './class.service';

@Controller()
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Get()
  getHello(): string {
    return this.classService.getHello();
  }
}
