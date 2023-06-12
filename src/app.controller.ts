import { Controller, Get, Post, Put } from '@nestjs/common';
import { AppService, staffService } from './app.service';

@Controller("app")      //路由装饰器，一般用于区分模块接口时候使用，该装饰器可以传入一个路径参数，作为访问这个控制器的主路径.
export class AppController {
  constructor(private readonly appService: AppService) { }

  //@Get、@Post、@Put等众多用于HTTP方法处理装饰器，经过它们装饰的方法，可以对相应的HTTP请求进行响应.
  //同时它们可以接受一个字符串或一个字符串数组作为参数，这里的字符串可以是固定的路径，也可以是通配符.

  //固定路径,可以匹配到 get请求，http://localhost:3000/app/list
  @Get("list")           // 
  getHello(): string {
    return this.appService.getHello();
  }

  // 可以匹配到 post请求，http://localhost:3000/app/userList
  @Post("userList")
  userList(): string {
    return '';
  }

  // 通配符路径(?+* 三种通配符 ), 可以匹配到 get请求, http://localhost:3000/app/user_xxx
  @Get("user_*")
  getUser(): any {
    return 'User_admin';
  }

  // 如果因为在匹配过程中， 发现路径@Put("userList/user")已经满足了,就不会继续往下匹配了，所以@Put("userList/user")装饰的方法应该写在它之前。
  @Put("userList/user")
  updateUser() {
    return { userId: 1 }
  }

  // 带参数路径，可以匹配到put请求，http://localhost:3000/app/userList/xxxx
  @Put("userList/:id")
  updatedUser(): any {
    return 'UserID:001'
  }



}

@Controller("staff")
export class staffController {
  constructor(private readonly appService: staffService) { }

  @Get('staffList')
  staffList(): any {
    return [{ name: '张三', age: '18', Job: '文员' }]
  }
}