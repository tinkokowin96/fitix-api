import { AppSchema } from '@app/decorator/app_schema.decorator';
import { parseUA } from '@app/helper/user_agent.helper';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum, IsIP, IsNotEmpty, IsString } from 'class-validator';
import { SchemaTypes } from 'mongoose';
import { IResult } from 'ua-parser-js';

@AppSchema()
export class Audit {
  @Prop({ type: String, enum: EPath, required: true })
  @IsNotEmpty()
  @IsEnum(EPath)
  path: EPath;

  @Prop({ type: String, enum: ERequestMethod })
  @IsNotEmpty()
  @IsEnum(ERequestMethod)
  method: ERequestMethod;

  @Prop({ type: String, required: true })
  @IsNotEmpty()
  @IsIP()
  submittedIP: string;

  @Prop({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  sessionId: string;

  @Prop({
    type: SchemaTypes.Mixed,
    required: true,
    set: (ua: string) => parseUA(ua),
  })
  @IsNotEmpty()
  userAgent: IResult;

  @Prop({ type: SchemaTypes.Mixed })
  @IsNotEmpty()
  payload: any;

  @Prop({ type: SchemaTypes.Mixed })
  @IsNotEmpty()
  response: any;

  @Prop({ type: SchemaTypes.Mixed })
  submittedUser?: User;
}

export const AuditSchema = SchemaFactory.createForClass(Audit);
