import { IsNotEmpty, MinLength } from 'class-validator';
export class CreateDto {
  @IsNotEmpty()
  @MinLength(6, {
    message: '用户名称长度最小$constraint1',
  })
  username: string;

  @IsNotEmpty()
  @MinLength(6, {
    message: '密码长度最小$constraint1',
  })
  password: string;
}
