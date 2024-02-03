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
  Matches,
  ValidationOptions,
} from 'class-validator';
import { SchemaDefinition } from 'mongoose';

type Options = {
  userName?: boolean;
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
    regex?: RegExp;
    options?: ValidationOptions;
  }[];
};

export function AppProp(propOptions: SchemaDefinition<any>, options?: Options) {
  return function (target: any, key: string) {
    const {
      validateString = true,
      prop = true,
      userName = false,
      transformer,
      swagger,
      validations,
      required = true,
    } = options;
    if (prop) Prop({ ...propOptions, required })(target, key);
    ApiProperty({
      type: propOptions.type,
      enum: propOptions.enum as any,
      example: propOptions.enum
        ? Object.keys(propOptions.enum)[0]
        : userName
          ? 'fitixUser11'
          : undefined,
      description: userName
        ? 'Unique username with contain letters & numbers only'
        : undefined,
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

    if (userName) {
      Matches(/^[a-zA-Z0-9]+$/, {
        message: 'Username must contain only letters and numbers',
      })(target, key);
    }

    validations?.forEach(({ name, regex, options: validateOption }) => {
      switch (name) {
        case EValidator.IsString:
          IsString(validateOption)(target, key);
          break;

        case EValidator.IsIP:
          IsIP()(target, key);
          break;

        case EValidator.Matches:
          Matches(regex, validateOption)(target, key);
          break;

        default:
          break;
      }
    });
    if (transformer)
      Type(transformer.typeFunction, transformer.options)(target, key);
  };
}
