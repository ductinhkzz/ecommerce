import { AbstractService } from '@/common/abstract.service';
import { Injectable } from '@nestjs/common';
import { ManufacturerEntity } from './manufacturer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { PaginateDto } from '@/common/paginate.dto';
import { paginate } from 'nestjs-typeorm-paginate';
import { Like } from 'typeorm';
import { CreateManufacturerDto, UpdateManufacturerDto } from './dtos';
import { UUID } from 'crypto';

@Injectable()
export class ManufacturerService extends AbstractService<ManufacturerEntity> {
  constructor(
    @InjectRepository(ManufacturerEntity)
    private readonly manufacturerRepository: Repository<ManufacturerEntity>,
  ) {
    super(manufacturerRepository);
  }

  async getManufacturers(options: PaginateDto) {
    return paginate<ManufacturerEntity>(
      this.manufacturerRepository,
      {
        page: options.page,
        limit: options.limit,
      },
      {
        ...(options.search && { name: Like(`%${options.search}%`) }),
      },
    );
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
