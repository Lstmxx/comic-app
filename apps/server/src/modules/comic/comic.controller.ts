import { Controller, Get, Param } from '@nestjs/common';
import { ComicService } from './comic.service';

@Controller('comic')
export class ComicController {
  constructor(private readonly comicService: ComicService) {}

  @Get()
  findAll() {
    return this.comicService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.comicService.findOne(name);
  }
}
