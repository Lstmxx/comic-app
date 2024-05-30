import { GlobalModule } from '@app/public-module';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GlobalModule.forRoot({
      yamlFilePath: ['apps/use-server.yaml'],
      serverName: 'user-service',
      cache: true,
      typeorm: true,
      // upload: true,
      // aliOss: true,
    }),
    UserModule,
  ],
})
export class AppModule {}
