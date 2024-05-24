import { Module, DynamicModule, Global } from '@nestjs/common';
import { LoggerService, LoggerServiceOptions } from './logger.service';

export const WINSTON_LOGGER_TOKEN = 'WINSTON_LOGGER';

/**
 * 日志模块
 */
@Global()
@Module({})
export class LoggerModule {
  public static forRoot(options: LoggerServiceOptions): DynamicModule {
    return {
      global: true,
      module: LoggerModule,
      providers: [
        {
          provide: WINSTON_LOGGER_TOKEN,
          useValue: new LoggerService(options),
        },
      ],
      exports: [WINSTON_LOGGER_TOKEN],
    };
  }
}
