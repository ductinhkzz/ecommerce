import { AbstractEntity } from '@/common/entities';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'category' })
export class CategoryEntity extends AbstractEntity {
  @ApiProperty()
  @Column()
  name: string;
}
