import * as Joi from 'joi';
import { PaginationDto } from '../../../dto/pagination.dto';

export class QueryUserDto extends PaginationDto {
  username?: string;
  ganger?: string;
}

export function validateQuery() {
  return Joi.object({
    username: Joi.any(),
    page: Joi.number().min(0).required(),
    limit: Joi.number(),
    ganger: Joi.any(),
  });
}
