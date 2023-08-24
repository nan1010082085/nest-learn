import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserLogs } from './user.logs.entity';
import { Roles } from './roles.entity';
import { UserProfile } from './user.profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToOne(() => UserProfile)
  profile: UserProfile;

  @OneToMany(() => UserLogs, (logs) => logs.user)
  logs: UserLogs[];

  @ManyToMany(() => Roles, (roles) => roles.users)
  @JoinTable({ name: 'user_roles' })
  roles: Roles[];
}
