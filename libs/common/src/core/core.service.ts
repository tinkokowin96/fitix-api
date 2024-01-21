import { Audit } from '@app/schema/audit.schema';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

@Injectable()
export abstract class CoreService<T> {
  @InjectConnection() connection: Connection;
  @InjectModel(Audit.name) audit: Model<Audit>;
  //   @InjectModel(Audit.name) audit: Model<Audit>;
}
