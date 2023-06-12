import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import envConfig from '../config/env'
import { AppController, staffController } from './app.controller';
import { AppService, staffService } from './app.service';
import { CompanyModule } from './company/company.module';
import { APP_PIPE } from "@nestjs/core";
import { ValidationPipe } from "./shared/pipe/validation.pipe";
@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,  // 设置为全局
    //   envFilePath: [envConfig.path]
    // }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => ({
    //     type: 'mysql', // 数据库类型
    //     entities: [],  // 数据表实体
    //     host: configService.get('DB_HOST', 'localhost'), // 主机，默认为localhost
    //     port: configService.get<number>('DB_PORT', 3306), // 端口号
    //     username: configService.get('DB_USER', 'root'),   // 用户名
    //     password: configService.get('DB_PASSWORD', '123456'), // 密码
    //     database: configService.get('DB_DATABASE', 'student'), //数据库名
    //     timezone: '+08:00', //服务器上配置的时区
    //     synchronize: true, //根据实体自动创建数据库表， 生产环境建议关闭
    //   }),
    // }),
    TypeOrmModule.forRoot({
      type: 'mysql',      //数据库类型
      host: 'localhost',      //数据库ip地址
      port: 3306,     //端口
      username: 'root',     //登录名
      password: '123456',     //密码
      database: 'student',      //数据库名称
      entities: [__dirname + '/**/*.entity{.ts,.js}'],      //扫描本项目中.entity.ts或者.entity.js的文件
      // synchronize: true,     //项目启动时自动创建数据库表,定义数据库表结构与实体类字段同步(这里一旦数据库少了字段就会自动加入,根据需要来使用)
      // migrationsRun: true,
      timezone: '+08:00',
      autoLoadEntities: true,     //自动加载实体
    }), CompanyModule,],      //导入模块的列表，如果需要使用其他模块的服务，需要通过这里导入.
  exports: [],      //导出服务的列表，供其他模块导入使用。如果希望当前模块下的服务可以被其他模块共享，需要在这里配置导出.
  controllers: [AppController, staffController,],     //处理http请求，包括路由控制，向客户端返回响应，将具体业务逻辑委托给providers处理.
  providers: [AppService, staffService, { provide: APP_PIPE, useClass: ValidationPipe }],      //Nest.js注入器实例化的提供者（服务提供者），处理具体的业务逻辑，各个模块之间可以共享.
})
export class AppModule { }
