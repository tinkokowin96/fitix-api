import { AppSchema } from '@app/decorator/app_schema.decorator';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { SchemaTypes } from 'mongoose';
import { MetaData } from './metadata.schema';

@AppSchema()
export class Option {
  @Prop({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'MetaData' }] })
  metaData: MetaData[];
}

export const OptionSchema = SchemaFactory.createForClass(Option);
