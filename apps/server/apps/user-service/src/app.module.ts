import { GlobalModule } from '@app/public-module';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GlobalModule.forRoot({
      typeorm: true,
    }),
    UserModule,
  ],
})
export class AppModule {}
