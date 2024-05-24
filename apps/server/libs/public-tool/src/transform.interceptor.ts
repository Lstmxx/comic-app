import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { TcpContext } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LoggerService } from '@app/public-module';
import { toIp } from './data';

export interface Response<T> {
  code: number;
  data: T;
}

let num = 0;
const line = '-'.repeat(50);
const interval = '/'.repeat(50);

/**
 * 注入请求日志
 * 响应参数转化为统一格式
 */
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private readonly loggerService: LoggerService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();

    this.loggerService.log(`第 ${++num} 次请求`, interval);
    this.loggerService.log('请求接收', line);

    let resNext = next.handle();

    if (res instanceof TcpContext) {
      this.loggerService.log('TCP 请求', res.getPattern());
      if (Object.keys(req).length) {
        if (Array.isArray(req)) {
          for (const index in req) {
            this.loggerService.log(`请求参数[${index}]`, req[index]);
          }
        } else {
          this.loggerService.log('请求参数', req);
        }
      }
      // 避免返回空导致参数序列化错误
      resNext = resNext.pipe(map((data) => data || {}));
    } else {
      const { url, clientIp, method, body } = req;
      this.loggerService.log(`${toIp(clientIp)} ${method}`, url);
      Object.keys(body).length && this.loggerService.log('请求参数', body);
      // 响应参数转化为统一格式
      resNext = resNext.pipe(map((data) => ({ code: res.statusCode, data })));
    }

    return resNext.pipe(
      tap((res) => {
        this.loggerService.log('响应结果', res);
        this.loggerService.log('请求成功', line);
      }),
    );
  }
}
