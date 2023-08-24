import { HttpService } from './../common/http/http.service';
import { Injectable } from '@nestjs/common';
import { HttpResultCode } from 'src/enum/http.enum';

@Injectable()
export class TestaService {
  constructor(private readonly httpService: HttpService) {}

  paramsQuery(query: string) {
    if (!query)
      return this.httpService.result(
        HttpResultCode.PARAMS_ERROR,
        '参数错误，未传递params',
      );
    if (isNaN(Number(query)))
      return this.httpService.result(
        HttpResultCode.PARAMS_ERROR,
        '参数传递非数字',
      );
    if (Number(query) === 5) {
      const data = [1, 2, 3, 4, 5].map((_, i) => (i + 1).toString());
      return this.httpService.result(HttpResultCode.SUCCESS, '请求成功', data);
    } else {
      return this.httpService.result(
        HttpResultCode.SUCCESS,
        '请求成功，返回请求参数',
        Number(query),
      );
    }
  }
}
