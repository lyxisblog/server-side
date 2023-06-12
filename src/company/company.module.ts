import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Node } from '../entitys/node.entity';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { XMLMiddleware } from '../shared/middleware/xml.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Node])],      //将entity中的User进行导入，这样UserService才能够正常使用
  controllers: [CompanyController],     //注册控制器模块
  providers: [CompanyService],      //注册服务模块     
})
export class CompanyModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(XMLMiddleware)     //要注册那个中间件
      .forRoutes('user');     //将中间件注册到那个控制器上，也可以是路径，但路径必须是：user/login(名称),就实现了只注册一个路由上。
    // 同一路由注册多个中间件的执行顺序为，先是全局中间件执行，然后是模块中间件执行，模块中的中间件顺序按照.apply中注册的顺序执行
  }
}
