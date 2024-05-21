import { Injectable } from '@nestjs/common';
import { CreateShorterDto } from '../dto/create-shorter.dto';
import { UpdateShorterDto } from '../dto/update-shorter.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Link } from 'schemas/link.schema';
import { Model } from 'mongoose';

@Injectable()
export class ShorterService {
  constructor(
    @InjectModel(Link.name) private linkModel: Model<Link>
  ) { }

  async create(createShorterDto: CreateShorterDto) {
    return this.linkModel.create({
      link: 'https://google.com',
      target: 'https://test.com',
      userId: '664ce24e19d59f34e14c0f25'
    });
  }

  findAll() {
    return 
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
