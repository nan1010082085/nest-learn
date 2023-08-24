import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolosService } from './rolos.service';
import { CreateRoloDto } from './dto/create-rolo.dto';
import { UpdateRoloDto } from './dto/update-rolo.dto';

@Controller('rolos')
export class RolosController {
  constructor(private readonly rolosService: RolosService) {}

  @Post()
  create(@Body() createRoloDto: CreateRoloDto) {
    return this.rolosService.create(createRoloDto);
  }

  @Get()
  findAll() {
    return this.rolosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoloDto: UpdateRoloDto) {
    return this.rolosService.update(+id, updateRoloDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolosService.remove(+id);
  }
}
