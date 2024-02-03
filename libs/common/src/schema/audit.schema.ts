import { User } from '@app/core/dto/user.dto';
import { AppProp } from '@app/decorator/app_prop.decorator';
import { AppSchema } from '@app/decorator/app_schema.decorator';
import { parseUA } from '@app/helper/user_agent.helper';
import { SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { IResult } from 'ua-parser-js';

@AppSchema()
export class Audit {
  @AppProp({ type: String, enum: EApp })
  app: EApp;

  @AppProp({ type: String, enum: EPath })
  path: EPath;

  @AppProp({ type: String, enum: ESchema })
  schema: ESchema;

  @AppProp({ type: String, enum: ERequestMethod })
  method: ERequestMethod;

  @AppProp(
    { type: String },
    {
      swagger: { example: '102.205.88.126' },
      validations: [{ name: EValidator.IsIP }],
    },
  )
  submittedIP: string;

  @AppProp({ type: String }, { validateString: true })
  sessionId: string;

  @AppProp({ type: SchemaTypes.Mixed, set: (ua: string) => parseUA(ua) })
  userAgent: IResult;

  @AppProp({ type: SchemaTypes.Mixed })
  payload: any;

  @AppProp({ type: SchemaTypes.Mixed })
  response: any;

  @AppProp(
    { type: SchemaTypes.Mixed },
    { required: false, transformer: { typeFunction: () => User } },
  )
  submittedUser?: User;
}

export const AuditSchema = SchemaFactory.createForClass(Audit);
