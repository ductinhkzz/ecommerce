import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateManufacturerDto {
  @ApiProperty()
  @IsString()
  name: string;
}
