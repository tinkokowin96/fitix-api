import { Injectable } from '@nestjs/common';

@Injectable()
export class SpotlightService {
  getHello(): string {
    return 'Hello World!';
  }
}
