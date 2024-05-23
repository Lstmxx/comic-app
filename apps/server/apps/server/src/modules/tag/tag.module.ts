import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { CustomHttpService } from '@app/public-module';

@Module({
  controllers: [TagController],
  providers: [TagService, CustomHttpService],
})
export class TagModule {}
