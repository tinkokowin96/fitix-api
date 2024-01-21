import { AppSchema } from '@app/decorator/app_schema.decorator';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { SchemaTypes } from 'mongoose';
import { Field } from './field.schema';

@AppSchema()
export class MetaData {
  @Prop({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Prop({ type: String })
  @IsString()
  description: string;

  @Prop({ type: String })
  @IsString()
  remark: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Field' }] })
  fields: Field[];
}

export const MetaDataSchema = SchemaFactory.createForClass(MetaData);
