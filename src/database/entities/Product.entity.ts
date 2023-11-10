import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CategoryEntity } from './Category.entity';
import { ManufacturerEntity } from './Manufacturer.entity';
import { AbstractEntity } from '@/common/entities';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'product' })
export class ProductEntity extends AbstractEntity {
  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ nullable: true })
  description?: string;

  @ApiProperty()
  @Column({ nullable: true })
  star?: number;

  @ApiProperty()
  @Column()
  price: number;

  @ApiProperty()
  @Column()
  image: string;

  @ApiProperty()
  @ManyToOne(() => CategoryEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @ApiProperty()
  @ManyToOne(() => ManufacturerEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'manufacturer_id' })
  manufacturer: ManufacturerEntity;
}
