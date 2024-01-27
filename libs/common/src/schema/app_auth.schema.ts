import { AppSchema } from '@app/decorator/app_schema.decorator';
import { Prop } from '@nestjs/mongoose';
import { hash } from 'bcryptjs';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

@AppSchema()
export class AppAuth {
  @Prop({ type: String, enum: EApp, required: true })
  @IsNotEmpty()
  @IsEnum(EApp)
  app: EApp;

  @Prop({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  userName: string;

  @Prop({
    type: String,
    required: true,
    set: async (pas) => await hash(pas, 16),
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
