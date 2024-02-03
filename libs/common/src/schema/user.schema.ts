import { AppProp } from '@app/decorator/app_prop.decorator';
import { AppSchema } from '@app/decorator/app_schema.decorator';
import { SchemaFactory } from '@nestjs/mongoose';
import { hash } from 'bcryptjs';
import { SchemaTypes } from 'mongoose';
import { EntityMetaData } from './entity_metadata.schema';

@AppSchema()
export class User {
  @AppProp({ type: String }, { userName: true })
  userName: string;

  @AppProp({ type: String })
  name: string;

  @AppProp({
    type: String,
    set: async (pas) => await hash(pas, 16),
  })
  password: string;

  @AppProp({ type: SchemaTypes.ObjectId, ref: 'EntityMetaData' })
  metaData: EntityMetaData;
}

export const UserSchema = SchemaFactory.createForClass(User);
