import { AppProp } from '@app/decorator/app_prop.decorator';
import { AppSchema } from '@app/decorator/app_schema.decorator';
import { SchemaFactory } from '@nestjs/mongoose';

@AppSchema()
export class Category {
  @AppProp({ type: String })
  name: string;

  @AppProp({ type: String, enum: ECategory })
  type: ECategory;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
