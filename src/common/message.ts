import { HttpStatus } from '@nestjs/common';

export function exceptionMessage(code: HttpStatus | number, message: string) {
  switch (code) {
    case 403:
      return '无权限访问。';
    case 500:
      return '服务异常：' + message;
    default:
      return message;
  }
}
