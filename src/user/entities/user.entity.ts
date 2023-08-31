import {
  AfterRemove,
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
import { Roles } from 'src/roles/entities/roles.entity';
import { log } from 'console';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToOne(() => UserProfile, (userProfile) => userProfile.user, {
    cascade: true,
  })
  profile: UserProfile;

  @OneToMany(() => Log, (log) => log.user, { cascade: true })
  logs: Log[];

  @ManyToMany(() => Roles, (roles) => roles.users, {
    cascade: ['insert'],
  })
  @JoinTable({ name: 'user_roles' })
  roles: Roles[];

  @AfterRemove()
  afterRemoveUser() {
    log('after-remove', this.username);
  }
}
