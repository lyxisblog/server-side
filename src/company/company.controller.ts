import { Controller, Body, Query, Param, Get, Post, Put, Delete, UseGuards, } from '@nestjs/common';
import { CompanyService, CompanyServiceDto } from './company.service';
import { Transaction } from 'typeorm';
// import { ValidationPipe } from '../shared/pipe/validation.pipe';
import { createDTO } from "../dto/create.dto";

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) { }
  /**
  * 创建文章
  * @param post
  */
  @Post("create")
  // @UseGuards()
  // 同一路由注册多个守卫的执行顺序为，先是全局守卫执行，然后是模块中守卫执行。
  // @UsePipes(new ValidationPipe)
  // 同一路由注册多个管道的时候，优先执行全局管道，然后再执行模块管道。
  async create(@Body() post: createDTO) {
    return await this.companyService.create(post);
  }

  /**
  * 获取所有文章
  */
  @Get()
  async findAll(@Query() query): Promise<CompanyServiceDto> {
    return await this.companyService.findAll(query);
  }

  /**
  * 获取指定文章
  * @param id 
  */
  @Get(":id")
  async findById(@Param('id') id) {
    return await this.companyService.findById(id)
  }

  /**
  * 更新文章
  * @param id 
  * @param post 
  */
  @Put(':id')
  async update(@Param("id") id, @Body() post: createDTO) {
    return await this.companyService.updateById(id, post);
  }

  /**
  * 删除
  * @param id 
  */
  @Delete(":id")
  async remove(@Param("id") id) {
    return await this.companyService.remove(id)
  }

}

