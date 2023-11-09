import { AbstractEntity } from '@/common';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'category' })
export class CategoryEntity extends AbstractEntity {
  @Column()
  name: string;
}
