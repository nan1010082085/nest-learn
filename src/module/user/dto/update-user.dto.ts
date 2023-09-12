import { Exclude } from 'class-transformer';
import { UserProfile } from '../entities/user.profile.entity';
import { Roles } from '../../roles/entities/roles.entity';
import { User } from '../entities/user.entity';
import { Allow } from 'class-validator';

export class UpdateUserDto extends User {
  @Exclude()
  username: string;

  @Exclude()
  password: string;

  @Allow()
  profile?: UserProfile;

  @Allow()
  roles?: Roles[];
}
