import { registerDecorator } from 'class-validator';

import type { ValidationArguments, ValidationOptions } from 'class-validator';

export function Regex(
  pattern: RegExp,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'regex',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [pattern],
      validator: {
        validate(value: unknown, args: ValidationArguments) {
          if (value === null || value === undefined) return true;

          if (typeof value !== 'string') return false;

          const trimValue = value.trim();

          if (trimValue.length === 0) return true;

          const [regex] = args.constraints as [RegExp];

          return regex.test(trimValue);
        },
        defaultMessage(args: ValidationArguments) {
          const options = args.constraints as ValidationOptions;

          return options?.message ? String(options.message) : 'invalidFormat';
        },
      },
    });
  };
}
