const ErrorMessageParam = {
  user: {
    'username.empty': '名称不能为空',
    'username.min': '名称长度不能小于3',
    'password.empty': '密码不能为空',
    'password.min': '密码长度不能小于6',
  },
};

type JoiError = {
  details: {
    path: string[];
    content: Record<string, string | unknown>;
  };
};

export class UserErrorMessage {
  /**
   * 模块定义的类型
   */
  private type: string;

  constructor(type: string) {
    this.type = type;
  }

  /**
   * text
   * @param err catch错误
   * @returns 错误描述的字符串
   */
  public text(err: JoiError) {
    const path = err.details[0].context.key;
    const str = err.details[0].type ?? '';
    return ErrorMessageParam[this.type][str.replace('string', path)];
  }
}
