/**
 * Record<ClassName, string[]>
 */
const controllerArr = {
  AuthController: ['login'],
  // 任意用户都可以创建日志
  LogsController: ['create'],
  // 对用户自己更新信息不进行校验
  UserController: ['getUserById', 'updateUser'],
};

/**
 * 不验证的控制器路由
 * @param n1 class name
 * @param n2 function name
 * @returns boolean
 */
export const notValidateByRole = (n1: string, n2: string) => {
  const className = Object.keys(controllerArr);
  const fnName = [...Object.values(controllerArr).flatMap((key) => key)];
  return className.includes(n1) && fnName.includes(n2);
};
