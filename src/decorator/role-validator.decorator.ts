import { SetMetadata } from '@nestjs/common';
import { DecoratorEnum } from '../enum/decorator.enum';

export const RoleValidator = (...args: number[]) =>
  SetMetadata(DecoratorEnum.ROLE_VALIDATOR, args);
