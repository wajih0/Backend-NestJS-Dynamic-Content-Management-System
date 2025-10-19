import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { User } from '../users/user.entity';
import { UserRole } from 'src/users/user.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepo: Repository<Article>,
  ) {}

  async create(createDto: CreateArticleDto, author: User) {
    const article = this.articleRepo.create({
      ...createDto,
      author,
    });
    return this.articleRepo.save(article);
  }

 async findAll(role: UserRole) {
  if (role === UserRole.ADMIN) {
    return this.articleRepo.find({
      relations: ['author'],
      order: { createdAt: 'DESC' },
    });
  } else {
    return this.articleRepo.find({
      where: { isPublished: true },
      relations: ['author'],
      order: { createdAt: 'DESC' },
    });
  }
}

  async update(id: number, updateDto: UpdateArticleDto) {
    const article = await this.articleRepo.findOne({ where: { id } });
    if (!article) throw new NotFoundException('Article not found');

    Object.assign(article, updateDto);
    return this.articleRepo.save(article);
  }

  async remove(id: number) {
    const article = await this.articleRepo.findOne({ where: { id } });
    if (!article) throw new NotFoundException('Article not found');

    return this.articleRepo.remove(article);
  }

   async findById(id: number) {
    const article = await this.articleRepo.findOne({ where: { id } });
    if (!article) throw new NotFoundException('Article not found');
    return article;
  }
}
