import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { Roles } from 'src/module/roles/entities/roles.entity';
export class CreateDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6, {
    message: '用户名称长度最小$constraint1',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, {
    message: '密码长度最小$constraint1',
  })
  password: string;
  roles?: number[] | Array<Partial<Roles>>;
}
