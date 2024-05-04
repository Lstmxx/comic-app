import { Inject, Injectable } from '@nestjs/common';
import { CustomHttpService } from 'src/common/custom-http/custom-http.service';

@Injectable()
export class ComicService {
  @Inject(CustomHttpService)
  private customHttpService: CustomHttpService;

  findAll() {
    return `This action returns all comic`;
  }

  async findOne(name: string) {
    const data = await this.customHttpService.get(`/comic2/${name}`);
    console.log(data);
    return data;
  }
}
