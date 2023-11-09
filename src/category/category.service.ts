import { AbstractService } from '@/common/abstract.service';
import { Injectable } from '@nestjs/common';
import { CategoryEntity } from './category.entity';
import { Like, Repository } from 'typeorm';
import { PaginateDto } from '@/common/paginate.dto';
import { paginate } from 'nestjs-typeorm-paginate';
import { UUID } from 'crypto';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService extends AbstractService<CategoryEntity> {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {
    super(categoryRepository);
  }

  async getCategories(options: PaginateDto) {
    return paginate<CategoryEntity>(
      this.categoryRepository,
      {
        page: options.page,
        limit: options.limit,
      },
      {
        ...(options.search && { name: Like(`%${options.search}%`) }),
      },
    );
  }

  async getCategory(id: UUID) {
    return this.findById(id);
  }

  async updateCategory(id: UUID, updateData: UpdateCategoryDto) {
    return this.update(id, updateData);
  }

  async deleteCategory(id: UUID) {
    return this.delete(id);
  }

  async createCategory(createData: CreateCategoryDto) {
    return this.create(createData);
  }
}
