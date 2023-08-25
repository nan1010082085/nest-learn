import { HttpStatus, Injectable } from '@nestjs/common';
import { httpResolveResult } from 'src/interface/http.interface';

@Injectable()
export class HttpService {
  public result(
    code: HttpStatus,
    message: string,
    data?: unknown,
  ): httpResolveResult {
    return data
      ? { code, message: message, data: data }
      : { code, message: message };
  }
}
