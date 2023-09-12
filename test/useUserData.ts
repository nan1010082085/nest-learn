import * as pactum from 'pactum';

export interface UseUserDataType {
  // url前缀
  prefix: string;
  // 测试用户名称和密码
  userDto: Partial<{ username: string; password: string }>;
  // 设置初始URL
  setDefaultUrl: () => void;
  // 创建用户
  createUser: () => Promise<{ id: string }>;
  // 获取鉴权登陆jwt token
  getToken: () => Promise<{ id: string; token: string }>;
}

export function useUserData(): UseUserDataType {
  const prefix = '/api/v1';

  const userDto = {
    username: 'qqqq222',
    password: '1234567',
  };

  const setDefaultUrl = (url: string = 'http://localhost:3000'): void => {
    pactum.request.setBaseUrl(url);
  };

  // 创建用户
  const createUser = async (): Promise<{ id: string }> => {
    const id = await pactum
      .spec()
      .post(prefix + '/user/create')
      .withBody(userDto)
      .returns((ctx) => ctx.res.json['data']);
    return { id };
  };

  // 获取 token
  const getToken = async (): Promise<{ id: string; token: string }> => {
    const id = await pactum
      .spec()
      .post(prefix + '/user/create')
      .withBody(userDto)
      .returns((ctx) => ctx.res.json['data']);

    const token = await pactum
      .spec()
      .post(prefix + '/auth/login')
      .withBody(userDto)
      .returns((ctx) => ctx.res.json['token']);

    return { id, token };
  };

  return {
    prefix,
    userDto,
    setDefaultUrl,
    createUser,
    getToken,
  };
}
