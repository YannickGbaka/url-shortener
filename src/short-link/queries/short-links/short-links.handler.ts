import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ShortLinksQuery } from './short-links.query';
import { ShortLinkRepository } from '../../db/short-link.repository';

@QueryHandler(ShortLinksQuery)
export class ShortLinksQueryHandler implements IQueryHandler<ShortLinksQuery> {
  constructor(protected readonly shortLinkRepository: ShortLinkRepository) {}

  execute(query: ShortLinksQuery): Promise<any> {
    return this.shortLinkRepository.findAll();
  }
}
