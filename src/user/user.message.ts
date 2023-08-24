import { HttpService } from 'src/common/http/http.service';
import { HttpResultCode } from 'src/enum/http.enum';

const userErrorMessageParam = {
  'username.empty': '名称不能为空',
  'username.min': '名称长度不能小于3',
  'password.empty': '密码不能为空',
  'password.min': '密码长度不能小于6',
};

type JoiError = {
  details: {
    path: string[];
    content: Record<string, string | unknown>;
  };
};

export class UserErrorMessage {
  private http: HttpService;
  constructor(httpService: HttpService) {
    this.http = httpService;
  }

  public text(code: HttpResultCode, err: JoiError) {
    const path = err.details[0].context.key;
    const str = err.details[0].type ?? '';
    return this.http.result(
      code,
      userErrorMessageParam[str.replace('string', path)],
    );
  }
}
