import { Injectable } from '@nestjs/common';
import { httpResolveResult } from 'src/interface/http.interface';

@Injectable()
export class HttpService {
  public result(
    code: httpResolveResult['code'],
    message: httpResolveResult['msg'],
    data?: httpResolveResult['data'],
  ): httpResolveResult {
    return data ? { code, msg: message, data: data } : { code, msg: message };
  }
}
