// casl ability

import { Injectable } from '@nestjs/common';
import {
  AbilityBuilder,
  ExtractSubjectType,
  createMongoAbility,
} from '@casl/ability';
import { Action } from '../../enum/action.enum';
import { Log } from '../logs/entities/log.entity';

@Injectable()
export default class CaslAbilityService<T> {
  forRoot() {
    const { can, build } = new AbilityBuilder(createMongoAbility);

    // test
    // param1 [Action] = enum/action.enum.ts 菜单下操作权限acl与枚举对应
    //        [Action] = entities/menus.entity => menu.acl 菜单下acl字段
    // param2 module/**/entities/*entity (class) 实体类
    // can(Action.READ, Log);
    // can(Action.UPDATE, Log);

    // 允许任意权限通过
    can('manage', 'all');

    const ability = build({
      detectSubjectType: (object) =>
        object.constructor as ExtractSubjectType<T>,
    });

    // ability.can
    // ability.cannot

    return ability;
  }
}
