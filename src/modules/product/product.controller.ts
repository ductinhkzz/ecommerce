import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dtos';
import { PageDto, PageOptionsDto } from '@/common/dtos';
import { ApiNoContentResponse, ApiOkResponse } from '@nestjs/swagger';
import { ProductEntity } from '@/database/entities';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: PageDto<ProductEntity> })
  getProducts(@Query() options: PageOptionsDto) {
    return this.productService.getProducts(options);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ProductEntity })
  getProduct(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.productService.getProduct(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  updateProduct(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateData: UpdateProductDto,
  ) {
    return this.productService.updateProduct(id, updateData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  deleteProduct(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.productService.deleteProduct(id);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ProductEntity })
  createManufacturer(@Body() data: CreateProductDto) {
    return this.productService.createProduct(data);
  }
}
