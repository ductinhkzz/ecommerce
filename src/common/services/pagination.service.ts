import { Repository, SelectQueryBuilder } from 'typeorm';
import { AbstractEntity } from '../entities';
import { BaseService } from './base.service';
import { PageDto, PageMetaDto, PageOptionsDto } from '../dtos';

export abstract class PaginationService<
  T extends AbstractEntity,
> extends BaseService<T> {
  constructor(readonly repository: Repository<T>) {
    super(repository);
  }

  async paginateQueryBuilder(
    query: SelectQueryBuilder<T>,
    options: PageOptionsDto,
  ): Promise<PageDto<T>> {
    try {
      const [data, total] = await query
        .skip(options.skip)
        .take(options.take)
        .getManyAndCount();

      const pageMetaDto = new PageMetaDto({
        itemCount: total,
        pageOptionsDto: options,
      });

      return new PageDto(data, pageMetaDto);
    } catch (error) {
      throw new Error(error);
    }
  }
}
