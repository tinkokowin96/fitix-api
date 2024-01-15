import { Injectable } from '@nestjs/common';

@Injectable()
export class MiscService {
  getHello(): string {
    return 'Hello World!';
  }
}
