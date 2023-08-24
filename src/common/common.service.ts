import { Injectable } from '@nestjs/common';

@Injectable()
export class commonService {
  static toArray(data: unknown) {
    return Array.isArray(data) ? data : [data];
  }
}
