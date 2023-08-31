import * as Joi from 'joi';
import { PaginationDto } from 'src/dto/pagination.dto';
import { transformPaginationDto } from 'src/utils/vaildate-dto';

export class GetUserDto extends PaginationDto {
  username?: string;
  ganger?: string;
}

export function validateQuery(query: GetUserDto) {
  // 校验数字
  transformPaginationDto(query);
  return Joi.object({
    username: Joi.any(),
    page: Joi.number().min(0).required(),
    limit: Joi.number(),
    ganger: Joi.any(),
  });
}
