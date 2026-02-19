import { AggregateRoot } from '@nestjs/cqrs';

export class ShortLink extends AggregateRoot {
  constructor(
    private readonly shortUrl: string,
    private readonly longUrl: string,
    private readonly createdAt?: Date,
    private readonly deletedAt?: Date,
    private readonly id?: string,
  ) {
    super();
  }

  getShortUrl = () => this.shortUrl;
  getLongUrl = () => this.longUrl;
  getId = () => this.id;
}
