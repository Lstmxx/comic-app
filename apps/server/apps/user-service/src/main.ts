import { microserviceBootstrap } from '@app/public-tool';
import { AppModule } from './app.module';
import { options } from '@app/microservices/use-service';

// 启动服务
microserviceBootstrap(AppModule, options);
