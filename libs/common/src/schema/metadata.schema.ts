import { AppProp } from '@app/decorator/app_prop.decorator';
import { AppSchema } from '@app/decorator/app_schema.decorator';
import { SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { Field } from './field.schema';

@AppSchema()
export class MetaData {
  @AppProp({ type: String })
  name: string;

  @AppProp({ type: String }, { required: false })
  description?: string;

  @AppProp({ type: String }, { required: false })
  remark?: string;

  @AppProp({ type: [{ type: SchemaTypes.ObjectId, ref: 'Field' }] })
  fields: Field[];
}

export const MetaDataSchema = SchemaFactory.createForClass(MetaData);
