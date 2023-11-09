import { CategoryEntity } from '@/category/category.entity';
import { AbstractEntity } from '@/common';
import { ManufacturerEntity } from '@/manufacturer/manufacturer.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'product' })
export class ProductEntity extends AbstractEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  star?: number;

  @Column()
  price: number;

  @Column()
  image: string;

  @ManyToOne(() => CategoryEntity, (category) => category, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_category' })
  category: CategoryEntity;

  @ManyToOne(() => ManufacturerEntity, (manufacturer) => manufacturer, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_category' })
  manufacturer: ManufacturerEntity;
}
