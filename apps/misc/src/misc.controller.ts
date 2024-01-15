import { Controller, Get } from '@nestjs/common';
import { MiscService } from './misc.service';

@Controller()
export class MiscController {
  constructor(private readonly miscService: MiscService) {}

  @Get()
  getHello(): string {
    return this.miscService.getHello();
  }
}
