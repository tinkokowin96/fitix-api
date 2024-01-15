import { NestFactory } from '@nestjs/core';
import { MiscModule } from './misc.module';

async function bootstrap() {
  const app = await NestFactory.create(MiscModule);
  await app.listen(3000);
}
bootstrap();
