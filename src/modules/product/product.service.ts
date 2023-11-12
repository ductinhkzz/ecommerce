import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './dtos';
import { PaginationService } from '@/common/services';
import {
  CategoryEntity,
  ManufacturerEntity,
  ProductEntity,
} from '@/database/entities';
import { PageOptionsDto } from '@/common/dtos';
import { Injectable } from '@nestjs/common/decorators/core';

@Injectable()
export class ProductService extends PaginationService<ProductEntity> {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(ManufacturerEntity)
    private manufacturerRepository: Repository<ManufacturerEntity>,
  ) {
    super(productRepository);
  }

  async createProduct(product: CreateProductDto) {
    const category = await this.categoryRepository.findOne({
      where: { id: product.category },
    });

    if (!category) {
      throw new NotFoundException('Not found category');
    }

    const manufacturer = await this.manufacturerRepository.findOne({
      where: { id: product.manufacturer },
    });

    if (!manufacturer) {
      throw new NotFoundException('Not found manufacturer');
    }

    const newProduct: DeepPartial<ProductEntity> = {
      ...product,
      category,
      manufacturer,
    };

    return this.create(newProduct);
  }

  async updateProduct(id: string, updateData: UpdateProductDto) {
    const category = await this.categoryRepository.findOne({
      where: { id: updateData.category },
    });

    if (!category) {
      throw new NotFoundException('Not found category');
    }

    const manufacturer = await this.manufacturerRepository.findOne({
      where: { id: updateData.manufacturer },
    });

    if (!manufacturer) {
      throw new NotFoundException('Not found manufacturer');
    }

    const newProduct: DeepPartial<ProductEntity> = {
      ...updateData,
      category,
      manufacturer,
    };

    return this.update(id, newProduct);
  }

  async deleteProduct(id: string) {
    return this.delete(id);
  }

  async getProducts(options: PageOptionsDto) {
    const query = this.productRepository
      .createQueryBuilder('product')
      .innerJoinAndSelect('product.category', 'category')
      .innerJoinAndSelect('product.manufacturer', 'manufacturer');

    return this.paginateQueryBuilder(query, options);
  }

  async getProduct(id: string) {
    return this.findById(id);
  }
}
