import { Exclude, Expose, Transform } from 'class-transformer';
import { UserProfile } from '../entities/user.profile.entity';
import { RoleDto } from '../../roles/dto/role.dto';

export class UserDto {
  @Expose()
  id: string;

  @Expose({ name: 'username' })
  name: string;

  @Exclude()
  password: string;

  // @Transform(({ value }) => {
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   const { id, ...data } = value;
  //   return data;
  // })
  @Expose()
  profile: UserProfile;

  @Transform(({ value }) => value.map((v: RoleDto) => v.id))
  @Expose()
  roles: string[];
}
