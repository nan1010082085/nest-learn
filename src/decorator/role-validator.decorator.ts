import { SetMetadata } from '@nestjs/common';
import { DecoratorEnum } from 'src/enum/decorator.enum';

export const RoleValidator = (...args: number[]) =>
  SetMetadata(DecoratorEnum.ROLE_VALIDATOR, args);
