import { Prop } from '@nestjs/mongoose';
import { hash } from 'bcryptjs';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { SchemaTypes } from 'mongoose';
import { EntityMetaData } from './entity_metadata.schema';
import { AppSchema } from '@app/decorator/app_schema.decorator';

@AppSchema()
export class User {
  @Prop({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'Username must contain only letters and numbers',
  })
  userName: string;

  @Prop({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({
    type: String,
    required: true,
    set: async (pas) => await hash(pas, 16),
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'EntityMetaData' })
  @IsNotEmpty()
  metaData: EntityMetaData;
}
