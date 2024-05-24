import {
  Injectable,
  LoggerService as CommonLoggerService,
} from '@nestjs/common';
import * as chalk from 'chalk';
import * as dayjs from 'dayjs';
import {
  createLogger,
  format,
  Logger,
  transports,
  LoggerOptions,
} from 'winston';

export type LoggerServiceOptions = LoggerOptions & {
  fileName: string;
};

/**
 * 拓展日志服务
 */
@Injectable()
export class LoggerService implements CommonLoggerService {
  private logger: Logger;

  constructor(options?: LoggerServiceOptions) {
    this.logger = createLogger({
      level: 'debug',
      format: format.combine(format.colorize(), format.simple()),
      transports: [
        new transports.Console({
          format: format.combine(
            format.errors({ stack: true }),
            format.colorize(),
            format.printf(({ context, level, message, time }) => {
              const appStr = chalk.green(`[NEST]`);
              console.log('context', context);
              if (typeof context === 'object') {
                context = JSON.stringify(context);
              }
              const contextStr = chalk.yellow(`[${context}]`);

              return `${appStr} ${time} ${level} ${contextStr} ${message} `;
            }),
          ),
        }),
        new transports.File({
          format: format.combine(format.timestamp(), format.json()),
          filename: options?.fileName || 'all.log',
          dirname: 'logs',
        }),
      ],
    });
  }

  getNow() {
    return dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
  }

  log(message: string, context?: any) {
    const time = this.getNow();
    this.logger.info(`${message}`, { context, time });
  }

  error(message: string, context?: any) {
    const time = this.getNow();
    this.logger.error(`${message}`, { context, time });
  }

  warn(message: string, context?: any) {
    const time = this.getNow();
    this.logger.warn(`${message}`, { context, time });
  }

  debug(message: string, context?: any) {
    const time = this.getNow();
    this.logger.debug(`${message}`, { context, time });
  }

  verbose(message: string, context?: any) {
    const time = this.getNow();
    this.logger.verbose(`${message}`, { context, time });
  }
}
