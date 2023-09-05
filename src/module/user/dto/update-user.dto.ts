import { CreateDto } from './create-user.dto';
import { UserProfile } from '../entities/user.profile.entity';
import { IsObject } from 'class-validator';

export class UpdateDto extends CreateDto {
  @IsObject()
  profile?: Partial<UserProfile>;
}
