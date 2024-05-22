import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ComicModule } from './modules/comic/comic.module';
import { CustomHttpModule } from './common/custom-http/custom-http.module';
import { TagModule } from './modules/tag/tag.module';

@Module({
  imports: [CustomHttpModule, UserModule, ComicModule, TagModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
