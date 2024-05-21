import { Controller, Get, Post, Body, Patch, Param, Delete, InternalServerErrorException } from '@nestjs/common';
import { ShorterService } from '../services/shorter.service';
import { CreateShorterDto } from '../dto/create-shorter.dto';
import { UpdateShorterDto } from '../dto/update-shorter.dto';

@Controller('shorter')
export class ShorterController {
  constructor(private readonly shorterService: ShorterService) { }

  @Post()
  async create(@Body() createShorterDto: CreateShorterDto) {
    try {

      return await this.shorterService.create(createShorterDto);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  @Get()
  findAll() {
    return this.shorterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shorterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShorterDto: UpdateShorterDto) {
    return this.shorterService.update(+id, updateShorterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shorterService.remove(+id);
  }
}
