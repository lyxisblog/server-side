import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository, } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Node } from '../entitys/node.entity';

export interface CompanyServiceDto {
  list: Node[];
  count: number;
}

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Node)
    private readonly postsRepository: Repository<Node>,
  ) { }

  // 创建文章
  async create(post: Partial<Node>): Promise<Node> {
    const { title } = post;
    if (!title) {
      throw new HttpException('缺少文章标题', 401);
    }
    const doc = await this.postsRepository.findOne({ where: { title } });
    if (doc) {
      throw new HttpException('文章已存在', 401);
    }
    return await this.postsRepository.save(post);
  }

  // 获取文章列表
  async findAll(query): Promise<CompanyServiceDto | any> {
    return await this.postsRepository.query('select * from node');
  }

  // 获取指定文章
  async findById(id): Promise<Node> {
    return await this.postsRepository.findOne({ where: { id } });
  }

  // 更新文章
  async updateById(id, post): Promise<Node> {
    const existPost = await this.postsRepository.findOne({ where: { id } });
    if (!existPost) {
      throw new HttpException(`id为${id}的文章不存在`, 401);
    }
    const updatePost = this.postsRepository.merge(existPost, post);
    return this.postsRepository.save(updatePost);
  }

  // 刪除文章
  async remove(id) {
    const existPost = await this.postsRepository.findOne({ where: { id } });
    if (!existPost) {
      throw new HttpException(`id为${id}的文章不存在`, 401);
    }
    return await this.postsRepository.remove(existPost);
  }
}