import { AppProp } from '@app/decorator/app_prop.decorator';
import { AppSchema } from '@app/decorator/app_schema.decorator';
import { SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { EntityMetaData } from './entity_metadata.schema';
import { Category } from './category.schema';

@AppSchema()
export class Club {
  @AppProp({ type: String })
  name: string;

  @AppProp({ type: SchemaTypes.ObjectId, ref: 'EntityMetaData' })
  metaData: EntityMetaData;

  @AppProp({ type: SchemaTypes.ObjectId, ref: 'Category' })
  type: Category;

  @AppProp({ type: [{ type: SchemaTypes.ObjectId, ref: 'Category' }] })
  tags: Category[];
}

export const ClubSchema = SchemaFactory.createForClass(Club);
