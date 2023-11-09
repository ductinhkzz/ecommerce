import { PaginateDto } from '@/common/paginate.dto';
import { IsOptional, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class GetProductDto extends PaginateDto {
  @IsOptional()
  @IsUUID(4, { each: true })
  categories?: UUID[] = [];

  @IsOptional()
  @IsUUID(4, { each: true })
  manufacturers?: UUID[] = [];
}
