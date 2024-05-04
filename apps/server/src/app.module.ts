import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ComicModule } from './modules/comic/comic.module';
import { CustomHttpModule } from './common/custom-http/custom-http.module';

@Module({
  imports: [CustomHttpModule, UserModule, ComicModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
