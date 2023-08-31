/**
 * @Author Yang (yang dong nan)
 * @Date 2023年8月31日 10:47:58
 * @LastEditorAuthors yangdongnan
 * @LastDate 2023年8月31日 10:47:58
 * @Description typeorm 操作存储库查询
 */

import { SelectQueryBuilder } from 'typeorm';

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
