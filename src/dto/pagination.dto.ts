import { IsString } from 'class-validator';

export class PaginationDto {
  @IsString()
  page: number;

  @IsString()
  limit: number;
}
