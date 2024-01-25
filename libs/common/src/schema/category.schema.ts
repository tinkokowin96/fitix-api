import { AppSchema } from '@app/decorator/app_schema.decorator';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

@AppSchema()
export class Category {
  @Prop({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Prop({ type: String, enum: ECategory, required: true })
  @IsNotEmpty()
  @IsEnum(ECategory)
  type: ECategory;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
