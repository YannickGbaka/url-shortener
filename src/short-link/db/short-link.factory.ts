import { Injectable } from '@nestjs/common';
import { ShortLink } from '../ShortLink';
import { ShortLinkEntity } from '../entities/short-link.entity';

@Injectable()
export class ShortLinkFactory {
  create(shortLink: ShortLink): ShortLinkEntity {
    return {
      id: shortLink.getId()!,
      shortUrl: shortLink.getShortUrl(),
      longUrl: shortLink.getLongUrl(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  createFromEntity = (shortLinkEntity: ShortLinkEntity) =>
    new ShortLink(
      shortLinkEntity.shortUrl,
      shortLinkEntity.longUrl,
      shortLinkEntity.createdAt,
      shortLinkEntity.updatedAt,
      shortLinkEntity.id,
    );
}
