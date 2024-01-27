import { APP } from '@app/utils/constants';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

export async function appBoorstrap(module: any, port: number) {
  const app = await NestFactory.create(module);
  const config = app.get<ConfigService>(ConfigService);
  const documentConfig = new DocumentBuilder()
    .setTitle(config.get<string>(APP))
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('swagger', app, document);
  app.use(helmet);
  await app.startAllMicroservices();
  await app.listen(port);
}
