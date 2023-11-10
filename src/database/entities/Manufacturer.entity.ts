import { AbstractEntity } from '@/common/entities';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'manufacturer' })
export class ManufacturerEntity extends AbstractEntity {
  @ApiProperty()
  @Column()
  name: string;
}
