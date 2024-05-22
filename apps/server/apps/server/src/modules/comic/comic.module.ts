import { Module } from '@nestjs/common';
import { ComicService } from './comic.service';
import { ComicController } from './comic.controller';
import { CustomHttpService } from 'src/common/custom-http/custom-http.service';

@Module({
  controllers: [ComicController],
  providers: [ComicService, CustomHttpService],
})
export class ComicModule {}
