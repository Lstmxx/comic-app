import { Controller, Get, Param, Query } from '@nestjs/common';
import { ComicService } from './comic.service';
import { ComicListDto } from './dto/comic-list.dto';
import { SearchComicDto } from './dto/search-comic.dto';
import { ChapterDto } from './dto/chapter.dto';
// import { ComicItem } from '@comic-app/types';
// import { Response } from 'express';

@Controller('comic')
export class ComicController {
  constructor(private readonly comicService: ComicService) {}

  @Get('list')
  async getComicList(@Query() query: ComicListDto) {
    console.log('query', query);
    const data = await this.comicService.getList(query);

    // const { results } = data;

    // const list: ComicItem[] = [];
    // for (let index = 0; index < results.list.length; index++) {
    //   const item = results.list[index];
    //   const cover = await this.comicService.coverImgToBase64(item.cover);
    //   list.push({
    //     ...item,
    //     cover,
    //   });
    // }
    // await results.list.forEach(async (item) => {
    //   const cover = await this.comicService.coverImgToBase64(item.cover);
    //   list.push({
    //     ...item,
    //     cover,
    //   });
    // });

    // data.results.list = list;

    return data;
  }

  @Get('search')
  searchComic(@Query() query: SearchComicDto) {
    return this.comicService.search(query);
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
