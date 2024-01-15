import { Module } from '@nestjs/common';
import { MiscController } from './misc.controller';
import { MiscService } from './misc.service';

@Module({
  imports: [],
  controllers: [MiscController],
  providers: [MiscService],
})
export class MiscModule {}
