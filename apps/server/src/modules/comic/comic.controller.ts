import { Controller, Get, Param, Query } from '@nestjs/common';
import { ComicService } from './comic.service';
import { ComicListDto } from './dto/comic-list.dto';
import { SearchComicDto } from './dto/search-comic.dto';
// import { ComicItem } from '@copymanga-app/types';
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

  // @Get('img-proxy')
  // async imgProxy(@Query('url') url: string, @Res() res: Response) {
  //   console.log('controller url', url);
  //   const response = await this.comicService.imgProxy(url);
  //   // res.send(response);
  //   const data = await response.arrayBuffer();
  //   console.log(data);
  //   const header = response.headers;
  //   for (const key of header.keys()) {
  //     res.setHeader(key, header.get(key as unknown as any) || '');
  //   }
  //   res.send(Buffer.from(data));
  //   console.log('response headers', response);
  // }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.comicService.findOne(name);
  }
}
