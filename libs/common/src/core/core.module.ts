import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { SharedModule } from '@app/shared/shared.module';
import { Audit, AuditSchema } from '@app/schema/audit.schema';

@Module({})
export class CoreModule implements NestModule {
  static config: CoreModuleConfigs;

  static forRoot(config: CoreModuleConfigs) {
    this.config = config;
    const module: any = {
      module: CoreModule,
      imports: [
        SharedModule, //Global Module
        MongooseModule.forFeature([{ name: Audit.name, schema: AuditSchema }]),
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
              urls: configService.get('RMQ_URL'),
              queue: `${config.app}_queue`,
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
  }
}
