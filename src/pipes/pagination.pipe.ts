/**
 * @Author Yang (yang dong nan)
 * @Date 2023年9月1日 13:34:50
 * @LastEditorAuthors yangdongnan
 * @LastDate 2023年9月1日 13:34:50
 * @Description 校验转换分页参数
 */

import { Injectable, PipeTransform } from '@nestjs/common';
import { transformPaginationDto } from '../utils/vaildate-dto';

@Injectable()
export class PaginationPipe implements PipeTransform {
  transform(value: any) {
    transformPaginationDto(value);
    return value;
  }
}
