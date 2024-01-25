import { AppSchema } from '@app/decorator/app_schema.decorator';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { SchemaTypes } from 'mongoose';
import { Category } from './category.schema';
import { EntityMetaData } from './entity_metadata.schema';

@AppSchema()
export class Option {
  @Prop({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Category' })
  category: Category;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'EntityMetaData' })
  metaData: EntityMetaData;
}

export const OptionSchema = SchemaFactory.createForClass(Option);
