import { IsOptional, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class GetProductDto {
  @IsOptional()
  @IsUUID(4, { each: true })
  categories?: UUID[] = [];

  @IsOptional()
  @IsUUID(4, { each: true })
  manufacturers?: UUID[] = [];
}
