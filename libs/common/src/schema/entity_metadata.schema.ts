import { AppSchema } from '@app/decorator/app_schema.decorator';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { ArrayNotEmpty, IsEnum, IsNotEmpty } from 'class-validator';
import { SchemaTypes } from 'mongoose';
import { MetaData } from './metadata.schema';

@AppSchema()
export class EntityMetaData {
  @Prop({ type: String, enum: EEntityMedtada, required: true })
  @IsNotEmpty()
  @IsEnum(EEntityMedtada)
  entity: EEntityMedtada;

  @Prop({ type: [{ type: SchemaTypes.Mixed, ref: 'MetaData' }] })
  @IsNotEmpty()
  @ArrayNotEmpty()
  metaData: MetaData[];

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Club' })
  club: Club;
}

export const EntityMetaDataSchema =
  SchemaFactory.createForClass(EntityMetaData);
