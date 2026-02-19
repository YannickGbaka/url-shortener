import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateShortLinkDto } from './dto/create-short-link.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShortLink } from './entities/short-link.entity';
import * as crypt from 'crypto';

@Injectable()
export class ShortLinkService {
  constructor(
    @InjectRepository(ShortLink)
    private readonly shortLinkRepository: Repository<ShortLink>,
  ) {}
  async create({ longUrl }: CreateShortLinkDto): Promise<ShortLink> {
    const existingRow = await this.shortLinkRepository.findOneBy({ longUrl });
    if (existingRow) return existingRow;

    const shortenUrl = await this.generateUniqueShortCode(longUrl);

    const newUrl = this.shortLinkRepository.create({
      longUrl,
      shortUrl: shortenUrl,
    });

    return await this.shortLinkRepository.save(newUrl);
  }

  findAll(): Promise<ShortLink[]> {
    return this.shortLinkRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} shortLink`;
  }

  async findOneByShortUrl(shortUrl: string): Promise<ShortLink> {
    const urlPayload = await this.shortLinkRepository.findOneBy({ shortUrl });
    if (!urlPayload) {
      throw new NotFoundException('This url does not exist');
    }
    return urlPayload;
  }

  remove(id: number) {
    return `This action removes a #${id} shortLink`;
  }

  async removeByShortLink(shortUrl: string) {
    const urlPayload = await this.shortLinkRepository.findOneBy({ shortUrl });
    console.log(urlPayload);
    if (!urlPayload) {
      return new NotFoundException();
    }

    return await this.shortLinkRepository.remove(urlPayload);
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

      const existingShortenUrl = await this.shortLinkRepository.findOneBy({
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
