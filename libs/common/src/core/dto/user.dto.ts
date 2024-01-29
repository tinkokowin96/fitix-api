import { AppProp } from '@app/decorator/app_prop.decorator';
import { SchemaTypes } from 'mongoose';

export class User {
  @AppProp({ type: String, enum: EUser })
  type: EUser;

  @AppProp({ type: SchemaTypes.ObjectId })
  id: ObjectId;
}
