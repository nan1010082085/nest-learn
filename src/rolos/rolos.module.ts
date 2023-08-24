import { Module } from '@nestjs/common';
import { RolosService } from './rolos.service';
import { RolosController } from './rolos.controller';

@Module({
  controllers: [RolosController],
  providers: [RolosService]
})
export class RolosModule {}
