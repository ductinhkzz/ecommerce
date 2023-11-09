import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  IsUUID,
} from 'class-validator';
import { UUID } from 'crypto';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  @Type(() => Number)
  star?: number;

  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsString()
  image: string;

  @IsUUID('4')
  category: UUID;

  @IsUUID('4')
  manufacturer: UUID;
}
