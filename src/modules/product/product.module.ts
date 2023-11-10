import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CategoryEntity,
  ManufacturerEntity,
  ProductEntity,
} from '@/database/entities';

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
