import { AppSchema } from '@app/decorator/app_schema.decorator';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

@AppSchema()
export class Field {
  @Prop({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Prop({ type: String, enum: EField, required: true })
  @IsNotEmpty()
  @IsEnum(EField)
  type: EField;

  @Prop({ type: String }) //will store as string (won't sanitze if stored as any)
  @IsString()
  value: string;
}

export const FieldSchema = SchemaFactory.createForClass(Field);
