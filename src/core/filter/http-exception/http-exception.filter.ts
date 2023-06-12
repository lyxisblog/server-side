import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  // exception 当前正在处理的异常对象
  // host 是传递给原始处理程序的参数的一个包装(Response/Request)的引用
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('-------------init 异常过滤器---------------');
    const ctx = host.switchToHttp();       //获取请求上下文
    const response = ctx.getResponse<Response>();     //获取请求上下文中的 response对象
    const request = ctx.getRequest<Request>();      //获取异常状态码
    // HttpException 属于基础异常类，可自定义内容
    // 如果是自定义的异常类则抛出自定义的status 
    // 否则就是内置HTTP异常类，然后抛出其对应的内置Status内容\
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    // 抛出错误信息
    const message = exception.message ? exception.message : `${status >= 500 ? 'Service Error' : 'Client Error'}`;
    const errorResponse = { data: {}, message: exception!?.getResponse() ?? message, code: 0, status, };
    let msgLog = {
      statusCode: status, // 系统错误状态
      timestamp: new Date().toISOString(), // 错误日期
      path: request.url, // 错误路由
      message: '请求失败',
      data: message // 错误消息内容体(争取和拦截器中定义的响应体一样)
    }

    // 打印错误综合日志
    Logger.error('错误信息', JSON.stringify(msgLog), 'HttpExceptionFilter',);
    // 设置返回的状态码， 请求头，发送错误信息
    response.status(status);
    // .json(msgLog);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}

// BadRequestException — 400
// UnauthorizedException — 401
// ForbiddenException — 403
// NotFoundException — 404
// NotAcceptableException — 406
// RequestTimeoutException — 408
// ConflictException — 409
// GoneException — 410
// PayloadTooLargeException — 413
// UnsupportedMediaTypeException — 415
// UnprocessableEntityException — 422
// InternalServerErrorException — 500
// NotImplementedException — 501
// BadGatewayException — 502
// ServiceUnavailableException — 503
// GatewayTimeoutException — 504