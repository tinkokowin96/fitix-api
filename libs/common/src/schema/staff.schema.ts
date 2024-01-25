import { AppSchema } from '@app/decorator/app_schema.decorator';
import { User } from './user.schema';

@AppSchema()
export class Staff extends User {}
