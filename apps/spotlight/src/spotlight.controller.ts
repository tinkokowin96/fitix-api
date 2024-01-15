import { Controller, Get } from '@nestjs/common';
import { SpotlightService } from './spotlight.service';

@Controller()
export class SpotlightController {
  constructor(private readonly spotlightService: SpotlightService) {}

  @Get()
  getHello(): string {
    return this.spotlightService.getHello();
  }
}
