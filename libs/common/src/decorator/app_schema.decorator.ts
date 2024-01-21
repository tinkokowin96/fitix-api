import { Prop, Schema } from '@nestjs/mongoose';
import { IsDateString, IsMongoId } from 'class-validator';
import { SchemaTypes } from 'mongoose';

export function AppSchema() {
  return function (target: any) {
    ['_id', 'createdAt', 'updatedAt'].map((key) => {
      if (key === '_id') {
        Prop({ type: SchemaTypes.ObjectId })(target.prototype, key);
        IsMongoId()(target.prototype, key);
      } else {
        Prop({ type: Date })(target.prototype, key);
        IsDateString()(target.prototype, key);
      }
    });
    Schema()(target);
  };
}
