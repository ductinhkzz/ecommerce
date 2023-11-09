import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { ManufacturerEntity } from '@/manufacturer/manufacturer.entity';
import { CategoryEntity } from '@/category/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      ManufacturerEntity,
      CategoryEntity,
    ]),
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
