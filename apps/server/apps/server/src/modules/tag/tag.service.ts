import { Inject, Injectable } from '@nestjs/common';
import { TagsRes } from '@comic-app/types';
import { CustomHttpService } from '@app/public-module';

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
