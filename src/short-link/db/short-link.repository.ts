import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateShortLinkDto } from '../dto/create-short-link.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShortLinkEntity } from '../entities/short-link.entity';
import * as crypt from 'crypto';
import { ShortLinkFactory } from './short-link.factory';
import { ShortLink } from '../ShortLink';

@Injectable()
export class ShortLinkRepository {
  constructor(
    @InjectRepository(ShortLinkEntity)
    private readonly shortLinkModel: Repository<ShortLinkEntity>,
    private readonly shortLinkFactory: ShortLinkFactory,
  ) {}
  async create({ longUrl }: CreateShortLinkDto): Promise<ShortLink> {
    const existingRow = await this.shortLinkModel.findOneBy({
      shortUrl: longUrl,
    });
    if (existingRow) return this.shortLinkFactory.createFromEntity(existingRow);

    const shortenUrl = await this.generateUniqueShortCode(longUrl);

    const shortLink = new ShortLink(shortenUrl, longUrl);

    return this.shortLinkFactory.createFromEntity(
      await this.shortLinkModel.save(this.shortLinkFactory.create(shortLink)),
    );
  }

  async findAll(): Promise<ShortLink[]> {
    const links = await this.shortLinkModel.find();
    return links.map((link) => this.shortLinkFactory.createFromEntity(link));
  }

  findOne(id: number) {
    return `This action returns a #${id} shortLink`;
  }

  async findOneByShortUrl(shortUrl: string): Promise<ShortLink> {
    const urlPayload = await this.shortLinkModel.findOneBy({ shortUrl });
    if (!urlPayload) {
      throw new NotFoundException('This url does not exist');
    }
    return this.shortLinkFactory.createFromEntity(urlPayload);
  }

  remove(id: number) {
    return `This action removes a #${id} shortLink`;
  }

  async removeByShortLink(shortUrl: string) {
    const urlPayload = await this.shortLinkModel.findOneBy({ shortUrl });
    console.log(urlPayload);
    if (!urlPayload) {
      return new NotFoundException();
    }

    return await this.shortLinkModel.remove(urlPayload);
  }

  private async generateUniqueShortCode(url: string) {
    const IDEAL_HASH_LENGTH = 7;

    let attemps = 0;

    while (attemps < 10) {
      const shortenUrl = crypt
        .createHash('sha512')
        .update(url)
        .digest('base64url')
        .substring(0, IDEAL_HASH_LENGTH);

      const existingShortenUrl = await this.shortLinkModel.findOneBy({
        shortUrl: shortenUrl,
      });

      if (!existingShortenUrl) {
        return shortenUrl;
      }

      attemps++;
    }
    throw new InternalServerErrorException(
      'something unexpected occured, try again please',
    );
  }
}
