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
import { ManufacturerService } from './manufacturer.service';
import { PaginateDto } from '@/common/paginate.dto';
import { UUID } from 'crypto';
import { UpdateManufacturerDto } from './dtos';

@Controller('manufaturer')
export class ManufacturerController {
  constructor(private readonly manufacturerService: ManufacturerService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getCategories(options: PaginateDto) {
    return this.manufacturerService.getManufacturers(options);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getProduct(@Param('id', new ParseUUIDPipe()) id: UUID) {
    return this.manufacturerService.getManufacturer(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  updateProduct(
    @Param('id', new ParseUUIDPipe()) id: UUID,
    @Body() updateData: UpdateManufacturerDto,
  ) {
    return this.manufacturerService.updateManufacturer(id, updateData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteProduct(@Param('id', new ParseUUIDPipe()) id: UUID) {
    return this.manufacturerService.deleteManufacturer(id);
  }
}
