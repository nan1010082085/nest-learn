import { Injectable } from '@nestjs/common';
import {
  AbilityBuilder,
  ExtractSubjectType,
  createMongoAbility,
} from '@casl/ability';

@Injectable()
export default class CaslAbilityService<T> {
  forRoot() {
    const { can, build } = new AbilityBuilder(createMongoAbility);

    // 所有权限
    can('manage', 'all');

    const ability = build({
      detectSubjectType: (object) =>
        object.constructor as ExtractSubjectType<T>,
    });

    return ability;
  }
}
