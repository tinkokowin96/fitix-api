import { AppSchema } from '@app/decorator/app_schema.decorator';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum, IsIP, IsNotEmpty, IsString } from 'class-validator';
import { SchemaTypes } from 'mongoose';

@AppSchema()
export class Audit {
  @Prop({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Prop({ type: String, enum: EApp })
  @IsNotEmpty()
  @IsEnum(EApp)
  module: EApp;

  @Prop({ type: String })
  @IsString()
  triggeredBy?: string;

  @Prop({ type: SchemaTypes.Mixed })
  payload?: any;

  @Prop({ type: SchemaTypes.Mixed })
  response?: any;

  @Prop({ type: String })
  @IsIP()
  submittedIP?: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  submittedUser?: User;
}

export const AuditSchema = SchemaFactory.createForClass(Audit);
