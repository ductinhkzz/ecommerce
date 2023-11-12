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
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';
import { PageDto, PageOptionsDto } from '@/common/dtos';
import { ApiNoContentResponse, ApiOkResponse } from '@nestjs/swagger';
import { CategoryEntity } from '@/database/entities';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: PageDto<CategoryEntity> })
  getCategories(@Query() options: PageOptionsDto) {
    return this.categoryService.getCategories(options);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: CategoryEntity })
  getCategory(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.categoryService.getCategory(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  updateCategory(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateData: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(id, updateData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  deleteCategory(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.categoryService.deleteCategory(id);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: CategoryEntity })
  createCategory(@Body() data: CreateCategoryDto) {
    return this.categoryService.createCategory(data);
  }
}
