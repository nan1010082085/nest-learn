import { HttpStatus } from '@nestjs/common';

export interface httpResolveResult {
  code: HttpStatus | number;
  message: string;
  data?: unknown;
}
