import { Inject, Injectable } from '@nestjs/common';
import {
  ComicDetail,
  ComicList,
  ComicSearchList,
  IChapterDetail,
  IComicChapterRes,
} from '@comic-app/types';
import { ComicPageDto } from './dto/comic-list.dto';
import { SearchComicDto } from './dto/search-comic.dto';
import { ChapterDto } from './dto/chapter.dto';
import { ChapterDetailDto } from './dto/chapter-detail.dto';
import { CustomHttpService } from '../../../../../libs/public-module/src/custom-http/custom-http.service';

@Injectable()
export class ComicService {
  @Inject(CustomHttpService)
  private customHttpService: CustomHttpService;

  async getList(ComicPageDto: ComicPageDto) {
    const data = await this.customHttpService.get<ComicList>('/comics', {
      params: ComicPageDto,
    });
    return data;
  }

  async findOne(name: string) {
    const data = await this.customHttpService.get<ComicDetail>(
      `/comic2/${name}`,
    );
    console.log(data);
    return data;
  }

  async search(searchComicDto: SearchComicDto) {
    const data = await this.customHttpService.get<ComicSearchList>(
      '/search/comic',
      {
        params: searchComicDto,
      },
    );
    return data;
  }

  async getChapter(query: ChapterDto) {
    console.log(`/comic/${query.name}/group/${query.groupType}/chapters`);
    const data = await this.customHttpService.get<IComicChapterRes>(
      `/comic/${query.name}/group/${query.groupType}/chapters`,
      {
        params: {
          limit: query.limit,
          offset: query.offset,
          _update: query._update,
        },
      },
    );
    console.log(data);
    return data;
  }

  async getChapterDetail(query: ChapterDetailDto) {
    const data = await this.customHttpService.get<IChapterDetail>(
      `/comic/${query.name}/chapter2/${query.chapterId}`,
      {
        params: {
          _update: true,
          platform: '3',
        },
      },
    );
    return data;
  }
}
