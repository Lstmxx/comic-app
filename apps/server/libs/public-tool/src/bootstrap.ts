import { LoggerService } from '@app/public-module';
import { NestApplicationOptions, INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { mw } from 'request-ip';

type BootstrapOptions = NestApplicationOptions & {
  // 在服务启动之前执行
  before?: (app: INestApplication) => void;
  // 使用微服务
  microservice?: boolean;
};

export async function bootstrap(
  module: any,
  bootstrapOptions?: BootstrapOptions,
) {
  const { before, microservice, ...options } = bootstrapOptions || {};
  const app = await NestFactory.create(module, options);

  before && before(app);

  // 获取客户端真实IP
  app.use(mw());

  const configService = app.get<ConfigService>('ConfigService');

  const server = configService.get('server');
  app.setGlobalPrefix(server.prefix);
  // 注入日志
  const loggerService = app.get(LoggerService);
  app.useLogger(loggerService);

  // 使用微服务
  const microserviceService = configService.get('microserviceService');
  if (microservice && microserviceService) {
    // 连接微服务
    app.connectMicroservice<MicroserviceOptions>(microserviceService, {
      inheritAppConfig: true,
    });

    // 启动所有微服务
    await app.startAllMicroservices();
  }

  // 启动HTTP服务
  await app.listen(server.port);

  // 捕获进程错误
  process.on('uncaughtException', function (err) {
    loggerService.error(err, '进程异常');
  });
}
