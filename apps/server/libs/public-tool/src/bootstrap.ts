import { WINSTON_LOGGER_TOKEN } from '@app/public-module';
import {
  NestApplicationOptions,
  INestApplication,
  INestMicroservice,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { mw } from 'request-ip';
import { AllExceptionFilter } from './all.exception.filter';
import { TransformInterceptor } from './transform.interceptor';

type BootstrapOptions = NestApplicationOptions & {
  // 在服务启动之前执行
  before?: (app: INestApplication) => void;
};

const useCommonMiddleware = (app: INestApplication | INestMicroservice) => {
  // 注入日志
  const loggerService = app.get(WINSTON_LOGGER_TOKEN);
  app.useLogger(loggerService);

  const allExceptionFilter = new AllExceptionFilter(loggerService);
  app.useGlobalFilters(allExceptionFilter);

  const transFormInterceptor = new TransformInterceptor(loggerService);
  app.useGlobalInterceptors(transFormInterceptor);

  return {
    loggerService,
    allExceptionFilter,
    transFormInterceptor,
  };
};

export async function bootstrap(
  module: any,
  bootstrapOptions?: BootstrapOptions,
) {
  const { before, ...options } = bootstrapOptions || {};
  const app = await NestFactory.create(module, options);

  before && before(app);

  // 获取客户端真实IP
  app.use(mw());

  const configService = app.get<ConfigService>(ConfigService);

  const server = configService.get('server');
  app.setGlobalPrefix(server.prefix);

  const { loggerService } = useCommonMiddleware(app);

  // 使用微服务
  // if (microservice) {
  //   const app = await NestFactory.createMicroservice<MicroserviceOptions>();
  // }

  // 启动HTTP服务
  await app.listen(server.port);

  // 捕获进程错误
  process.on('uncaughtException', function (err) {
    loggerService.error('进程异常', err);
  });
}

type MicroserviceBootstrapOptions = MicroserviceOptions & {
  // 在服务启动之前执行
  before?: (app: INestMicroservice) => void;
};

export async function microserviceBootstrap(
  module: any,
  bootstrapOptions?: MicroserviceBootstrapOptions,
) {
  const { before, ...options } = bootstrapOptions || {};
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    module,
    options,
  );

  before && before(app);
  // 注入日志
  const { loggerService } = useCommonMiddleware(app);

  app.listen();

  loggerService.log('微服务启动成功', '');
}
