import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ShortLinkQuery } from './short-link.query';
import { ShortLinkRepository } from 'src/short-link/db/short-link.repository';
import { ShortLink } from 'src/short-link/ShortLink';

@QueryHandler(ShortLinkQuery)
export class ShortLinkQueryHandler implements IQueryHandler<ShortLinkQuery> {
  constructor(protected readonly shortLinkRepository: ShortLinkRepository) {}

  async execute({ shortUrl }: ShortLinkQuery): Promise<ShortLink> {
    return await this.shortLinkRepository.findOneByShortUrl(shortUrl);
  }
}
