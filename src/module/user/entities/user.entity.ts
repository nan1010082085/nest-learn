import {
  AfterRemove,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserProfile } from './user.profile.entity';
import { log } from 'console';
import { Log } from '../../logs/entities/log.entity';
import { Roles } from '../../roles/entities/roles.entity';

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
  profile?: UserProfile;

  @OneToMany(() => Log, (log) => log.user, { cascade: true })
  logs: Log[];

  @ManyToMany(() => Roles, (roles) => roles.users, {
    cascade: ['insert'],
  })
  @JoinTable({ name: 'user_roles' })
  roles?: Roles[];

  @AfterRemove()
  afterRemoveUser() {
    log('after-remove', this.username);
  }

  @CreateDateColumn()
  createDate: string;

  @UpdateDateColumn()
  updateDate: string;
}
