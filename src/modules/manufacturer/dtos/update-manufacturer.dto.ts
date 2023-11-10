import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateManufacturerDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
