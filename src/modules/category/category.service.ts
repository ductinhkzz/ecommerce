import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '@/database/entities';
import { PaginationService } from '@/common/services';
import { PageOptionsDto } from '@/common/dtos';

@Injectable()
export class CategoryService extends PaginationService<CategoryEntity> {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {
    super(categoryRepository);
  }

  async getCategories(options: PageOptionsDto) {
    const query = this.categoryRepository.createQueryBuilder('category');
    return this.paginateQueryBuilder(query, options);
  }

  async getCategory(id: string) {
    return this.findById(id);
  }

  async updateCategory(id: string, updateData: UpdateCategoryDto) {
    return this.update(id, updateData);
  }

  async deleteCategory(id: string) {
    return this.delete(id);
  }

  async createCategory(createData: CreateCategoryDto) {
    return this.create(createData);
  }
}
