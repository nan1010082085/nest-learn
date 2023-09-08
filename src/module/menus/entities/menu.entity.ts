import { Roles } from '../../roles/entities/roles.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column()
  order: number;

  // ['CREATE', 'DELETE', 'UPDATE', 'READ']
  @Column({ type: 'simple-array' })
  acl: string[];

  @ManyToMany(() => Roles, (role) => role.menus)
  @JoinTable({ name: 'role_menus' })
  role: Roles;
}
