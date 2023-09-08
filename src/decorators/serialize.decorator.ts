import { ClassConstructor } from 'class-transformer';
import { SerializeInterceptor } from '../interceptor/serialize.interceptor';
import { UseInterceptors } from '@nestjs/common';

/**
 * 序列化装饰器
 * @param dto customDto
 * @returns
 */
export const Serialize = <T extends ClassConstructor<any>>(dto: T) => {
  return UseInterceptors(new SerializeInterceptor(dto));
};
