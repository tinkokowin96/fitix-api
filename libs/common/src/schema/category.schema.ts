import { AppSchema } from '@app/decorator/app_schema.decorator';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';

@AppSchema()
export class Category {
  @Prop({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
