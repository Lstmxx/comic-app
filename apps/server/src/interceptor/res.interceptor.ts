import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        console.log('data', data);
        const { code, results, message } = data;
        if (results) {
          if (code !== 200) {
            throw new HttpException(message, code);
          }
          return {
            code,
            message,
            data: results,
          };
        }
        return data;
      })
    );
  }
}
