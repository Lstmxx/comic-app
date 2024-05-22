import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { CustomHttpService } from 'src/common/custom-http/custom-http.service';

@Module({
  controllers: [TagController],
  providers: [TagService, CustomHttpService],
})
export class TagModule {}
