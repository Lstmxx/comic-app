import { Inject, Injectable } from '@nestjs/common';
import {
  CustomHttpService,
  DEFAULT_HEADERS,
} from 'src/common/custom-http/custom-http.service';
import {
  ComicDetail,
  ComicList,
  ComicSearchList,
  IComicChapterRes,
} from '@comic-app/types';
import { ComicListDto } from './dto/comic-list.dto';
import { SearchComicDto } from './dto/search-comic.dto';
import { arrayBufferToImgSrc } from 'src/common/utils/img';
import { ChapterDto } from './dto/chapter.dto';

@Injectable()
export class ComicService {
  @Inject(CustomHttpService)
  private customHttpService: CustomHttpService;

  async getList(ComicListDto: ComicListDto) {
    const data = await this.customHttpService.get<ComicList>('/comics', {
      params: ComicListDto,
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

  async coverImgToBase64(url: string) {
    console.log('url', url);
    const response = await fetch(url, {
      method: 'GET',
      headers: DEFAULT_HEADERS,
    });
    const base64str = arrayBufferToImgSrc(await response.arrayBuffer());

    return base64str;
  }

  async getChapter(query: ChapterDto) {
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
    return data;
  }
}
