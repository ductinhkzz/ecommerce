import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class AbstractEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @ApiProperty()
  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamp',
  })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamp',
  })
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn({
    name: 'delete_at',
    type: 'timestamp',
  })
  deletedAt: Date;
}
