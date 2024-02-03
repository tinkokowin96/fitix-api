import { AppProp } from '@app/decorator/app_prop.decorator';
import { AppSchema } from '@app/decorator/app_schema.decorator';
import { SchemaFactory } from '@nestjs/mongoose';

@AppSchema()
export class Field {
  @AppProp({ type: String })
  name: string;

  @AppProp({ type: String, enum: EField })
  type: EField;

  @AppProp({ type: String }) //will store as string (won't sanitze if stored as any)
  value: string;
}

export const FieldSchema = SchemaFactory.createForClass(Field);
