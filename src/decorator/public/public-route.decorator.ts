/**
 * @Author Yang (yang dong nan)
 * @Date 2023年9月4日 11:11:30
 * @LastEditorAuthors yangdongnan
 * @LastDate 2023年9月4日 11:11:30
 * @Description 跳过验证的路由
 */

import { SetMetadata } from '@nestjs/common';
import { DecoratorEnum } from 'src/enum/decorator.enum';

export const PublicRoute = (...args: string[]) =>
  SetMetadata(DecoratorEnum.IS_PUBLIC_ROUTE, args);
