import { microserviceBootstrap } from '@app/public-tool';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

// 启动服务
microserviceBootstrap(AppModule, {
  transport: Transport.TCP,
  options: {
    port: 4001,
  },
});
