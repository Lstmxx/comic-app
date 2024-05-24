import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ComicModule } from './modules/comic/comic.module';
import { TagModule } from './modules/tag/tag.module';
import { CustomHttpModule, GlobalModule } from '@app/public-module';

@Module({
  imports: [
    GlobalModule.forRoot({
      yamlFilePath: ['apps/server.yaml'],
      microservice: true,
      serverName: 'server',
      cache: true,
      // upload: true,
      // aliOss: true,
    }),
    CustomHttpModule,
    UserModule,
    ComicModule,
    TagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
