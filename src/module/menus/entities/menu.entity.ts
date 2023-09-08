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

  // 每个角色有多个菜单
  @ManyToMany(() => Roles, (role) => role.menus)
  // 生成关联的表文件
  @JoinTable({ name: 'role_menus' })
  role: Roles;
}
