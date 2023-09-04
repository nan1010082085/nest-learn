import { CreateDto } from './create-user.dto';
import { UserProfile } from '../entities/user.profile.entity';

export class UpdateDto extends CreateDto {
  profile?: Partial<UserProfile>;
}
