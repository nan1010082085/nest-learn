import { PartialType } from '@nestjs/mapped-types';
import { CreateRoloDto } from './create-rolo.dto';

export class UpdateRoloDto extends PartialType(CreateRoloDto) {}
