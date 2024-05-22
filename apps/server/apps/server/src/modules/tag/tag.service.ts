import { Inject, Injectable } from '@nestjs/common';
import { CustomHttpService } from 'src/common/custom-http/custom-http.service';
import { TagsRes } from '@comic-app/types';

@Injectable()
export class TagService {
  @Inject(CustomHttpService)
  private customHttpService: CustomHttpService;

  async findAll() {
    const data = await this.customHttpService.get<TagsRes>(
      '/h5/filter/comic/tags',
    );
    return data;
  }
}
