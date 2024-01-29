import { AppSchema } from "@app/decorator/app_schema.decorator";
import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

@AppSchema()
export class Club {
    @Prop({type: String, required: true})
    @IsNotEmpty()
    @IsString()

}