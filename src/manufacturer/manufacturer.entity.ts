import { AbstractEntity } from '@/common';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'manufacturer' })
export class ManufacturerEntity extends AbstractEntity {
  @Column()
  name: string;
}
