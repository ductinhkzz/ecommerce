import { DeepPartial, Repository } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { NotFoundException } from '@nestjs/common';

export abstract class AbstractService<T extends AbstractEntity> {
  constructor(readonly repository: Repository<T>) {}

  findAll() {
    return this.repository.find();
  }

  async findById(id: T['id']): Promise<T> {
    const queryBuilder = this.repository
      .createQueryBuilder('repo')
      .where('repo.id = :id', { id });

    const postEntity = await queryBuilder.getOne();

    if (!postEntity) {
      throw new NotFoundException();
    }

    return postEntity;
  }

  async delete(id: T['id']): Promise<void> {
    const queryBuilder = this.repository
      .createQueryBuilder('repo')
      .where('repo.id = :id', { id });

    const postEntity = await queryBuilder.getOne();

    if (!postEntity) {
      throw new NotFoundException();
    }

    await this.repository.remove(postEntity);
  }

  async update(id: T['id'], updateDto: DeepPartial<T>): Promise<void> {
    const queryBuilder = this.repository
      .createQueryBuilder('repo')
      .where('repo.id = :id', { id });

    const dataEntity = await queryBuilder.getOne();

    if (!dataEntity) {
      throw new NotFoundException();
    }

    this.repository.merge(dataEntity, updateDto);

    await this.repository.save(updateDto);
  }

  async create(data: DeepPartial<T>) {
    const newRecord = this.repository.create(data);
    return this.repository.save(newRecord);
  }
}
