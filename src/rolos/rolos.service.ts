import { Injectable } from '@nestjs/common';
import { CreateRoloDto } from './dto/create-rolo.dto';
import { UpdateRoloDto } from './dto/update-rolo.dto';

@Injectable()
export class RolosService {
  create(createRoloDto: CreateRoloDto) {
    return 'This action adds a new rolo';
  }

  findAll() {
    return `This action returns all rolos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rolo`;
  }

  update(id: number, updateRoloDto: UpdateRoloDto) {
    return `This action updates a #${id} rolo`;
  }

  remove(id: number) {
    return `This action removes a #${id} rolo`;
  }
}
