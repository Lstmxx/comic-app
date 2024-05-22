import { Controller, Get, Param, Query } from '@nestjs/common';
import { ComicService } from './comic.service';
import { ComicPageDto } from './dto/comic-list.dto';
import { SearchComicDto } from './dto/search-comic.dto';
import { ChapterDto } from './dto/chapter.dto';
import { ChapterDetailDto } from './dto/chapter-detail.dto';
// import { ComicItem } from '@comic-app/types';
// import { Response } from 'express';

@Controller('comic')
export class ComicController {
  constructor(private readonly comicService: ComicService) {}

  @Get('list')
  async getComicList(@Query() query: ComicPageDto) {
    console.log('query', query);
    const data = await this.comicService.getList(query);

    return data;
  }

  @Get('search')
  searchComic(@Query() query: SearchComicDto) {
    return this.comicService.search(query);
  }

  @Get('chapter/detail')
  getChapterDetail(@Query() query: ChapterDetailDto) {
    return this.comicService.getChapterDetail(query);
  }

  @Get('chapter')
  getChapter(@Query() query: ChapterDto) {
    return this.comicService.getChapter(query);
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.comicService.findOne(name);
  }
}
