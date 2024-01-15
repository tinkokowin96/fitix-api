import { NestFactory } from '@nestjs/core';
import { SpotlightModule } from './spotlight.module';

async function bootstrap() {
  const app = await NestFactory.create(SpotlightModule);
  await app.listen(3000);
}
bootstrap();
