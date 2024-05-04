import { Inject, Injectable } from '@nestjs/common';
import { CustomHttpService } from 'src/common/custom-http/custom-http.service';
import { ComicDetail } from '@packages/types/vo/comic.d';
import { SearchComicDto } from './dto/search-comic.dto';

@Injectable()
export class ComicService {
  @Inject(CustomHttpService)
  private customHttpService: CustomHttpService;

  getList(searchComicDto: SearchComicDto) {
    const data = this.customHttpService.get('/comics', {
      params: searchComicDto,
    });
    return data;
  }

  async findOne(name: string) {
    const data = await this.customHttpService.get<ComicDetail>(`/comic2/${name}`);
    console.log(data);
    return data;
  }
}
