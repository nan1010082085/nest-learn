import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserProfile } from './user.profile.entity';
import { Log } from 'src/logs/entities/log.entity';
import { Role } from 'src/rolos/entities/rolo.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToOne(() => UserProfile, (userProfile) => userProfile.user)
  profile: UserProfile;

  @OneToMany(() => Log, (log) => log.user)
  logs: Log[];

  @ManyToMany(() => Role, (roles) => roles.users)
  @JoinTable({ name: 'user_roles' })
  roles: Role[];
}
