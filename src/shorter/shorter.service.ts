import { Injectable } from '@nestjs/common';
import { CreateShorterDto } from './dto/create-shorter.dto';
import { UpdateShorterDto } from './dto/update-shorter.dto';

@Injectable()
export class ShorterService {
  create(createShorterDto: CreateShorterDto) {
    return 'This action adds a new shorter';
  }

  findAll() {
    return `This action returns all shorter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shorter`;
  }

  update(id: number, updateShorterDto: UpdateShorterDto) {
    return `This action updates a #${id} shorter`;
  }

  remove(id: number) {
    return `This action removes a #${id} shorter`;
  }
}
