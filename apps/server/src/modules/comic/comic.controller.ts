import { Controller, Get, Param, Query } from '@nestjs/common';
import { ComicService } from './comic.service';
import { ComicListDto } from './dto/comic-list.dto';
import { SearchComicDto } from './dto/search-comic.dto';

@Controller('comic')
export class ComicController {
  constructor(private readonly comicService: ComicService) {}

  @Get('list')
  getComicList(@Query() query: ComicListDto) {
    console.log('query', query);
    return this.comicService.getList(query);
  }

  @Get('search')
  searchComic(@Query() query: SearchComicDto) {
    return this.comicService.search(query);
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.comicService.findOne(name);
  }
}
