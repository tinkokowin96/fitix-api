import { AppProp } from '@app/decorator/app_prop.decorator';
import { AppSchema } from '@app/decorator/app_schema.decorator';
import { SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { Category } from './category.schema';
import { EntityMetaData } from './entity_metadata.schema';

@AppSchema()
export class Option {
  @AppProp({ type: String })
  name: string;

  @AppProp({ type: SchemaTypes.ObjectId, ref: 'Category' }, { required: false })
  category: Category;

  @AppProp(
    { type: SchemaTypes.ObjectId, ref: 'EntityMetaData' },
    { required: false },
  )
  metaData?: EntityMetaData;
}

export const OptionSchema = SchemaFactory.createForClass(Option);
