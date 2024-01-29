import { Prop } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { Type, TypeHelpOptions, TypeOptions } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsIP,
  IsNotEmpty,
  IsString,
  ValidationOptions,
} from 'class-validator';
import { SchemaDefinition } from 'mongoose';

type Options = {
  required?: boolean;
  validateString?: boolean;
  prop?: boolean;
  transformer?: {
    typeFunction?: (type?: TypeHelpOptions) => any;
    options?: TypeOptions;
  };
  swagger?: Omit<ApiPropertyOptions, 'type'>;
  validations?: {
    name: EValidator;
    options?: ValidationOptions;
  }[];
};

export function AppProp(propOptions: SchemaDefinition<any>, options?: Options) {
  return function (target: any, key: string) {
    const {
      validateString = false,
      prop = true,
      transformer,
      swagger,
      validations,
      required = true,
    } = options;
    if (prop) Prop({ ...propOptions, required })(target, key);
    ApiProperty({
      type: propOptions.type,
      enum: propOptions.enum as any,
      example: propOptions.enum ? Object.keys(propOptions.enum)[0] : undefined,
      ...swagger,
    })(target, key);

    if (required) IsNotEmpty()(target, key);
    if (propOptions.enum) IsEnum(propOptions.enum as any)(target, key);

    switch ((propOptions.type as any).name) {
      case 'String':
        if (validateString) IsString()(target, key);
        break;

      case 'Boolean':
        IsBoolean()(target, key);
        break;

      case 'Date':
        IsDateString()(target, key);
        break;

      default:
        break;
    }

    validations?.forEach(({ name, options: validateOption }) => {
      switch (name) {
        case EValidator.IsString:
          IsString(validateOption)(target, key);
          break;

        case EValidator.IsIP:
          IsIP()(target, key);
          break;

        default:
          break;
      }
    });
    if (transformer)
      Type(transformer.typeFunction, transformer.options)(target, key);
  };
}
