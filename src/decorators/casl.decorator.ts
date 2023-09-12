import { AnyMongoAbility, InferSubjects } from '@casl/ability';
import { SetMetadata } from '@nestjs/common';
import { Action } from '../enum/action.enum';

export enum CASL_ABILITY_KEY {
  PUBLICY_HANDLER = 'PUBLICY_HANDLER',
  CAN = 'CAN',
  CANNOT = 'CANNOT',
}

export type PolicyHandlerCallback = (ability: AnyMongoAbility) => boolean;

export type CanHandlerType = PolicyHandlerCallback | PolicyHandlerCallback[];

/**
 * 任意的组合
 * [ability.can, ability.can]
 * @param args {PolicyHandlerCallback}
 * @returns
 */
export const PolicyHandler = (...abilities: PolicyHandlerCallback[]) =>
  SetMetadata(CASL_ABILITY_KEY.PUBLICY_HANDLER, abilities);

/**
 * ability.can(action: 操作, subject: 实体类, conditions: 详细字段)
 * @param action Action enum
 * @param subject Entity
 * @param conditions Entity.property
 * @returns
 */
export const Can = <T = any>(
  action: Action,
  subject: InferSubjects<T>,
  conditions?: any,
) =>
  SetMetadata(CASL_ABILITY_KEY.CAN, (ability: AnyMongoAbility) =>
    ability.can(action, subject, conditions),
  );

/**
 * ability.cannot(action: 操作, subject: 实体类, conditions: 详细字段)
 * @param action Action enum
 * @param subject Entity
 * @param conditions Entity.property
 * @returns
 */
export const Cannot = <T = any>(
  action: Action,
  subject: InferSubjects<T>,
  conditions?: any,
) =>
  SetMetadata(CASL_ABILITY_KEY.CANNOT, (ability: AnyMongoAbility) =>
    ability.can(action, subject, conditions),
  );
