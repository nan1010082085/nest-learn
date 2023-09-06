import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { log } from 'console';

export class CreateRoleDto {
  @IsString({ message: '角色名必须是字符串' })
  @IsNotEmpty({ message: '角色名不能为空' })
  @MinLength(2, {
    message: ({ constraints }) => {
      return `角色名长度最小为${constraints[0]}`;
    },
  })
  @Expose()
  name: string;
}
