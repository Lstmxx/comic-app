import { Controller, Get, Param, Query } from '@nestjs/common';
import { ComicService } from './comic.service';
import { SearchComicDto } from './dto/search-comic.dto';

@Controller('comic')
export class ComicController {
  constructor(private readonly comicService: ComicService) {}

  @Get('list')
  getComicList(@Query() query: SearchComicDto) {
    console.log('query', query);
    return this.comicService.getList(query);
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.comicService.findOne(name);
  }
}
