// query builder typeorm

import { BadRequestException } from '@nestjs/common';
import { PaginationDto } from 'src/dto/pagination.dto';
import { SelectQueryBuilder } from 'typeorm';

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

// 解析查询参数
export class QueryBuilderTypeORM<T> {
  constructor(public _queryBuilder: SelectQueryBuilder<T>) {}

  whereBuilder(query: Record<string, unknown>) {
    for (const key in query) {
      const value = query[key];
      if (value) {
        this._queryBuilder.andWhere(`${key} = :${key}`, { [key]: value });
      }
    }
    return this._queryBuilder;
  }
}
