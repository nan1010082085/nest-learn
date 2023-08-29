import { BadRequestException } from '@nestjs/common';
import Joi from 'joi';

export class GetUserDto {
  page: number;
  limit?: number;
  username?: string;
  ganger?: string;
}

export function validateQuery(query: GetUserDto) {
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
  return Joi.object({
    username: Joi.any(),
    ganger: Joi.any(),
    page: Joi.number().min(0).required(),
    limit: Joi.number(),
  });
}
