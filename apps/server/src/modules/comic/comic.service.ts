import { Inject, Injectable } from '@nestjs/common';
import { CustomHttpService } from 'src/common/custom-http/custom-http.service';
import { ComicDetail, ComicList, ComicSearchList } from '@copymanga-app/types';
import { ComicListDto } from './dto/comic-list.dto';
import { SearchComicDto } from './dto/search-comic.dto';

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
}
