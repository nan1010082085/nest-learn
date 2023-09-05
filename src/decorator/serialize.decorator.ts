import { ClassConstructor } from 'class-transformer';
import { SerializeInterceptor } from './../interceptor/serialize.interceptor';
import { UseInterceptors } from '@nestjs/common';

export const Serialize = <T extends ClassConstructor<any>>(dto: T) => {
  return UseInterceptors(new SerializeInterceptor(dto));
};
