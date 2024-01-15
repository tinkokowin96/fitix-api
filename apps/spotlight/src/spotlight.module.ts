import { Module } from '@nestjs/common';
import { SpotlightController } from './spotlight.controller';
import { SpotlightService } from './spotlight.service';

@Module({
  imports: [],
  controllers: [SpotlightController],
  providers: [SpotlightService],
})
export class SpotlightModule {}
