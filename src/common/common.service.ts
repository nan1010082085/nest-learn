import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  toArray(data: unknown) {
    return Array.isArray(data) ? data : [data];
  }
}
