import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateShortLinkCommand } from './create-short-link.command';
import { ShortLink } from '../ShortLink';
import { ShortLinkRepository } from '../db/short-link.repository';

@CommandHandler(CreateShortLinkCommand)
export class CreateShortLinkHandler implements ICommandHandler<CreateShortLinkCommand> {
  constructor(private readonly shortLinkRepository: ShortLinkRepository) {}

  async execute(command: CreateShortLinkCommand): Promise<any> {
    const { longUrl } = command.createShortLinkDto;
    const shortUrl =
      await this.shortLinkRepository.generateUniqueShortCode(longUrl);

    const shortLinkModel = new ShortLink(shortUrl, longUrl);
  }
}
