/**
 * @Author Yang (yang dong nan)
 * @Date 2023年8月31日 10:47:29
 * @LastEditorAuthors yangdongnan
 * @LastDate 2023年8月31日 10:47:29
 * @Description 验证传入数据
 */

import { BadRequestException } from '@nestjs/common';
import { PaginationDto } from '../dto/pagination.dto';

export function transformPaginationDto<T extends PaginationDto>(query: T) {
  // 校验数字
  const page = Number(query.page);
  const limit = Number(query.limit);
  if (isNaN(page)) {
    throw new BadRequestException('请检查分页参数');
  }
  if (isNaN(limit)) {
    throw new BadRequestException('请检查分页参数');
  }
  // 转换数字，Joi校验
  query.page = page;
  query.limit = limit;
  return query;
}
