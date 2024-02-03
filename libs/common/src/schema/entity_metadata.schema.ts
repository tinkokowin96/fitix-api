import { AppProp } from '@app/decorator/app_prop.decorator';
import { AppSchema } from '@app/decorator/app_schema.decorator';
import { SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { MetaData } from './metadata.schema';
import { Club } from './club.schema';

/**
  TODO: To restrict which user allowed to modify which entitymetada(**NO UI FOR ANY APP TO MANAGE THAT**)

  ========== Super Admin (FITIX) ============
  Club
  ========== Super Admin (FITIX) ============

  ================= Admin ===================
  ================= Admin ===================

  ================ Trainer ==================
  ================ Trainer ==================

  ================= Member ==================
  ================= Member ==================

 */

@AppSchema()
export class EntityMetaData {
  @AppProp({ type: String, enum: EEntityMedtada })
  entity: EEntityMedtada;

  @AppProp({ type: [{ type: SchemaTypes.Mixed, ref: 'MetaData' }] })
  metaData: MetaData[];

  @AppProp({ type: SchemaTypes.ObjectId, ref: 'Club' }, { required: false })
  club?: Club;
}

export const EntityMetaDataSchema =
  SchemaFactory.createForClass(EntityMetaData);
