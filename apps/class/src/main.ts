import { NestFactory } from '@nestjs/core';
import { ClassModule } from './class.module';

async function bootstrap() {
  const app = await NestFactory.create(ClassModule);
  await app.listen(3000);
}
bootstrap();
