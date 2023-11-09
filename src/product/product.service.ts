import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { DeepPartial, In, Like, Repository } from 'typeorm';
import { AbstractService } from '@/common/abstract.service';
import { CreateProductDto, GetProductDto, UpdateProductDto } from './dtos';
import { CategoryEntity } from '@/category/category.entity';
import { ManufacturerEntity } from '@/manufacturer/manufacturer.entity';
import { UUID } from 'crypto';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class ProductService extends AbstractService<ProductEntity> {
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

  async updateProduct(id: UUID, updateData: UpdateProductDto) {
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

  async deleteProduct(id: UUID) {
    return this.delete(id);
  }

  async paginate(options: GetProductDto): Promise<Pagination<ProductEntity>> {
    return paginate<ProductEntity>(
      this.productRepository,
      {
        page: options.page,
        limit: options.limit,
      },
      {
        ...(options.search && { name: Like(`%${options.search}%`) }),
        ...(options.categories.length > 0 && {
          category: In(options.categories),
        }),
        ...(options.manufacturers.length > 0 && {
          manufacturer: In(options.manufacturers),
        }),
      },
    );
  }

  async getProduct(id: UUID) {
    return this.findById(id);
  }
}
