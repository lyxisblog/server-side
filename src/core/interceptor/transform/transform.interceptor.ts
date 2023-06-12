
import { CallHandler, ExecutionContext, Injectable, NestInterceptor, } from '@nestjs/common';
import { map, Observable } from 'rxjs';

interface Response<T> {
  data: T
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<Response<T>> {
    const ctx = context.switchToHttp();     //解析ExecutionContext的数据
    const request = ctx.getRequest();     //解析ExecutionContext的数据的内容获取到请求体
    console.log('-------------init Interceptor---------------');
    return next.handle().pipe(map((data) => ({ data, code: 0, msg: '请求成功', })),);
  }
}