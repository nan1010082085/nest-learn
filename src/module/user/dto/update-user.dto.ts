import { CreateDto } from './create-user.dto';
import { UserProfile } from '../entities/user.profile.entity';
import { Roles } from 'src/module/roles/entities/roles.entity';

export class UpdateDto extends CreateDto {
  profile?: Partial<UserProfile>;
  roles?: Partial<Roles>;
}
