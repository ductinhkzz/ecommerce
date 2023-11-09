import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { GetProductDto, UpdateProductDto } from './dtos';
import { UUID } from 'crypto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getProducts(options: GetProductDto) {
    return this.productService.paginate(options);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getProduct(@Param('id', new ParseUUIDPipe()) id: UUID) {
    return this.productService.getProduct(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  updateProduct(
    @Param('id', new ParseUUIDPipe()) id: UUID,
    @Body() updateData: UpdateProductDto,
  ) {
    return this.productService.updateProduct(id, updateData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteProduct(@Param('id', new ParseUUIDPipe()) id: UUID) {
    return this.productService.deleteProduct(id);
  }
}
