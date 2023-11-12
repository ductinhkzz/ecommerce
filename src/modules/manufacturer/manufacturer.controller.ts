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
import { ManufacturerService } from './manufacturer.service';
import { CreateManufacturerDto, UpdateManufacturerDto } from './dtos';
import { PageDto, PageOptionsDto } from '@/common/dtos';
import { ApiNoContentResponse, ApiOkResponse } from '@nestjs/swagger';
import { ManufacturerEntity } from '@/database/entities';

@Controller('manufaturer')
export class ManufacturerController {
  constructor(private readonly manufacturerService: ManufacturerService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: PageDto<ManufacturerEntity> })
  getManufacturers(@Query() options: PageOptionsDto) {
    return this.manufacturerService.getManufacturers(options);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ManufacturerEntity })
  getManufacturer(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.manufacturerService.getManufacturer(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  updateManufacturer(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateData: UpdateManufacturerDto,
  ) {
    return this.manufacturerService.updateManufacturer(id, updateData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  deleteManufacturer(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.manufacturerService.deleteManufacturer(id);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ManufacturerEntity })
  createManufacturer(@Body() data: CreateManufacturerDto) {
    return this.manufacturerService.createManufacturer(data);
  }
}
