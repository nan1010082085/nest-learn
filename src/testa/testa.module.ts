import { Module } from '@nestjs/common';
import { TestaController } from './testa.controller';
import { TestaService } from './testa.service';

@Module({
  controllers: [TestaController],
  providers: [TestaService],
})
export class TestaModule {}
