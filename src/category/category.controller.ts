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
import { CategoryService } from './category.service';
import { PaginateDto } from '@/common/paginate.dto';
import { UUID } from 'crypto';
import { UpdateCategoryDto } from './dtos';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getCategories(options: PaginateDto) {
    return this.categoryService.getCategories(options);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getProduct(@Param('id', new ParseUUIDPipe()) id: UUID) {
    return this.categoryService.getCategory(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  updateProduct(
    @Param('id', new ParseUUIDPipe()) id: UUID,
    @Body() updateData: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(id, updateData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteProduct(@Param('id', new ParseUUIDPipe()) id: UUID) {
    return this.categoryService.deleteCategory(id);
  }
}
