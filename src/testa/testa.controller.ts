import { httpResolveResult } from 'src/interface/http.interface';
import { TestaService } from './testa.service';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('testa')
export class TestaController {
  constructor(private readonly testaService: TestaService) {}

  @Get('range')
  getRange(@Query('params') params: string): httpResolveResult {
    return this.testaService.paramsQuery(params);
  }
}
