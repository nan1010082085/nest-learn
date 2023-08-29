import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  toArray(data: unknown) {
    return Array.isArray(data) ? data : [data];
  }

  trimObject<T>(object: T) {
    const data = {} as T;
    for (const key in object) {
      const element = object[key];
      if ((typeof element !== void 0 || element === 0) && element) {
        data[key] = element;
      }
    }
    return data;
  }
}
