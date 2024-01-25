import { AppSchema } from '@app/decorator/app_schema.decorator';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { MetaData } from './metadata.schema';
import { ArrayNotEmpty, IsEnum, IsNotEmpty } from 'class-validator';

@AppSchema()
export class EntityMetaData {
  @Prop({ type: String, enum: EEntityMedtada, required: true })
  @IsNotEmpty()
  @IsEnum(EEntityMedtada)
  entity: EEntityMedtada;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'MetaData' }] })
  @IsNotEmpty()
  @ArrayNotEmpty()
  metaData: MetaData[];
}

export const EntityMetaDataSchema =
  SchemaFactory.createForClass(EntityMetaData);
