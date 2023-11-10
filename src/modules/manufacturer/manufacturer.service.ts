import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateManufacturerDto, UpdateManufacturerDto } from './dtos';
import { UUID } from 'crypto';
import { PaginationService } from '@/common/services';
import { ManufacturerEntity } from '@/database/entities';
import { PageOptionsDto } from '@/common/dtos';

@Injectable()
export class ManufacturerService extends PaginationService<ManufacturerEntity> {
  constructor(
    @InjectRepository(ManufacturerEntity)
    private readonly manufacturerRepository: Repository<ManufacturerEntity>,
  ) {
    super(manufacturerRepository);
  }

  async getManufacturers(options: PageOptionsDto) {
    const query =
      this.manufacturerRepository.createQueryBuilder('manufacturer');

    return this.paginateQueryBuilder(query, options);
  }

  async getManufacturer(id: UUID) {
    return this.findById(id);
  }

  async updateManufacturer(id: UUID, updateData: UpdateManufacturerDto) {
    return this.update(id, updateData);
  }

  async deleteManufacturer(id: UUID) {
    return this.delete(id);
  }

  async createManufacturer(createData: CreateManufacturerDto) {
    return this.create(createData);
  }
}
