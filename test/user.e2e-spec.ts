import * as pactum from 'pactum';
import { useUserData } from './useUserData';

describe('UserController (e2e)', () => {
  const prefix = '/api/v1';

  const { userDto, getToken } = useUserData();

  it('创建用户', () => {
    return pactum
      .spec()
      .post(prefix + '/user/create')
      .withBody(userDto)
      .expectStatus(201);
  });

  it('通过ID查询用户', async () => {
    const { id, token } = await getToken();

    const spec = pactum.spec();

    const res = await spec
      .get(prefix + '/user/{id}')
      .withBearerToken(token)
      .withPathParams('id', id)
      .expectStatus(200)
      .returns((ctx) => ctx.res.json);

    // 返回code 200
    spec.expectJson(res.code, 200);

    // 返回data data.id == user.id
    spec.expectJson(res.data.id, id);

    // 返回data data.name == user.username
    spec.expectJson(res.data.name, userDto.username);
  });
});
