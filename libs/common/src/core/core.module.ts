import { AppAuth } from '@app/schema/app_auth.schema';
import { Audit, AuditSchema } from '@app/schema/audit.schema';
import { SharedModule } from '@app/shared/shared.module';
import { APP_AUTH_MODEL, RMQ_URI } from '@app/utils/constants';
import {
  DynamicModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import * as cookieParser from 'cookie-parser';
import { Model } from 'mongoose';
import { join } from 'path';
import { Repository } from './repository';
import { BasicAuthMiddleware } from './middleware/basic_auth.middleware';

@Module({})
export class CoreModule implements NestModule {
  static config: CoreModuleConfigs;

  static forRoot(config: CoreModuleConfigs) {
    this.config = config;
    const module: DynamicModule = {
      module: CoreModule,
      imports: [
        SharedModule, //Global Module
        MongooseModule.forFeature([{ name: Audit.name, schema: AuditSchema }]),
      ],
      providers: [
        ConfigModule,
        {
          provide: APP_AUTH_MODEL,
          useFactory: (model: Model<AppAuth>) => new Repository(model),
          inject: [AppAuth],
        },
      ],
    };
    if (config.mongo !== false)
      module.imports.push(
        MongooseModule.forRootAsync({
          useFactory: (
            configService: ConfigService,
          ): MongooseModuleOptions => ({
            uri: configService.get('MONGODB_URI'),
          }),
          inject: [ConfigService],
        }),
      );

    if (config.rmq !== false || config.grpc !== false) {
      const options = [];
      if (config.rmq)
        options.push({
          name: config.app,
          useFactory: (configService: ConfigService) => ({
            transport: Transport.RMQ,
            options: {
              urls: configService.get(RMQ_URI),
              queue: `${config.app}_queue`,
              noAck: false,
              persistent: true,
            },
          }),
          inject: [ConfigService],
        });
      if (config.grpc)
        options.push({
          name: `${config.app}_PACKAGE`,
          transport: Transport.GRPC,
          options: {
            package: config.app.toLowerCase(),
            protoPath: join(__dirname, `${config.app.toLowerCase()}.proto`),
          },
        });
      module.imports.push(ClientsModule.registerAsync(options));
    }

    return module;
  }

  configure(consumer: MiddlewareConsumer) {
    if (CoreModule.config.useCookie !== false)
      consumer.apply(cookieParser()).forRoutes('*');
    consumer
      .apply(BasicAuthMiddleware)
      .forRoutes('/^/.*/swagger$/', '/^/login$/', '/^/register$/');
  }
}
