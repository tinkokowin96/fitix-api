import { AppProp } from '@app/decorator/app_prop.decorator';
import { AppSchema } from '@app/decorator/app_schema.decorator';
import { SchemaFactory } from '@nestjs/mongoose';
import { hash } from 'bcryptjs';

@AppSchema()
export class AppAuth {
  @AppProp({ type: String, enum: EApp })
  app: EApp;

  @AppProp(
    { type: String },
    { validateString: true, swagger: { example: 'admin' } },
  )
  userName: string;

  @AppProp(
    { type: String, set: async (pas) => await hash(pas, 16) },
    {
      swagger: {
        example: '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
        description: 'Hashed password',
      },
    },
  )
  password: string;
}

export const AppAuthSchema = SchemaFactory.createForClass(AppAuth);
