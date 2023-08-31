import { HttpStatus, Injectable } from '@nestjs/common';
import { httpResolveResult } from 'src/interface/http.interface';

@Injectable()
export class HttpService {
  public result(
    code: HttpStatus,
    message: string,
    data?: unknown,
    page?: unknown,
  ): httpResolveResult {
    const result = { code, message: message };
    if (data) {
      Reflect.set(result, 'data', data);
    }
    if (page) {
      Reflect.set(result, 'page', page);
    }
    return result;
  }
}
