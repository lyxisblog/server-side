import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filter/http-exception/http-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform/transform.interceptor';
import { XMLMiddleware } from './shared/middleware/xml.middleware';
import { AuthGuard } from './shared/guard/auth.guard';
import { ValidationPipe } from './shared/pipe/validation.pipe';

//创建一个过滤器：nest g filter core/filter/http-exception
//创建一个拦截器：nest g interceptor core/interceptor/transform
//nest g [文件类型] [文件名] [文件目录]
//文件类型：[mo：Module]、[co：controller]、[s:service]
//注意创建顺序：先创建Module, 再创建Controller和Service, 这样创建出来的文件在Module中自动注册，
//反之，后创建Module, Controller和Service,会被注册到外层的app.module.ts

async function bootstrap() {
  const app = await NestFactory.create(AppModule);      //实例化NestFactory
  app.setGlobalPrefix('api');     //设置全局路由前缀
  app.useGlobalFilters(new HttpExceptionFilter());      //注册全局错误的过滤器
  app.useGlobalInterceptors(new TransformInterceptor());      //注册全局拦截器
  app.use(new XMLMiddleware().use);     //全局注册中间件
  app.useGlobalGuards(new AuthGuard());     //全局注册守卫
  app.useGlobalPipes(new ValidationPipe());     //全局注册验证管道
  await app.listen(3000);     //设置端口号
}
bootstrap();
