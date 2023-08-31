import { CreateDto } from './create-user.dto';
import { Roles } from 'src/roles/entities/roles.entity';
import { UserProfile } from '../entities/user.profile.entity';

export class UpdateDto extends CreateDto {
  profile?: Partial<UserProfile>;
  roles?: Partial<Roles>;
}
