import { Module } from '@nestjs/common';
import { CustomHttpService } from './custom-http.service';

@Module({
  exports: [CustomHttpService],
  providers: [CustomHttpService],
})
export class CustomHttpModule {}
