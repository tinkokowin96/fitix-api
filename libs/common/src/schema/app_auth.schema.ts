import { AppProp } from '@app/decorator/app_prop.decorator';
import { AppSchema } from '@app/decorator/app_schema.decorator';
import { SchemaFactory } from '@nestjs/mongoose';
import { hash } from 'bcryptjs';

@AppSchema()
export class AppAuth {
  @AppProp({ type: String, enum: EApp })
  app: EApp;

  @AppProp({ type: String }, { userName: true })
  userName: string;

  @AppProp({ type: String, set: async (pas) => await hash(pas, 16) })
  password: string;
}

export const AppAuthSchema = SchemaFactory.createForClass(AppAuth);
