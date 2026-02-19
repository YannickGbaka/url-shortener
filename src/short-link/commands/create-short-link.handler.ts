import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateShortLinkCommand } from './create-short-link.command';
import { ShortLink } from '../ShortLink';
import { ShortLinkRepository } from '../db/short-link.repository';
import { ShortLinkCreatedEvent } from '../events/short-link-created.event';

@CommandHandler(CreateShortLinkCommand)
export class CreateShortLinkHandler implements ICommandHandler<CreateShortLinkCommand> {
  constructor(
    private readonly shortLinkRepository: ShortLinkRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: CreateShortLinkCommand): Promise<any> {
    const { longUrl } = command.createShortLinkDto;

    const existingShortLinkData =
      await this.shortLinkRepository.findByLongUrl(longUrl);
    if (existingShortLinkData) {
      const shortLink = this.eventPublisher.mergeObjectContext(
        existingShortLinkData,
      );
      shortLink.apply(
        new ShortLinkCreatedEvent(existingShortLinkData.getId()!),
      );
      return shortLink.commit();
    }

    const shortUrl =
      await this.shortLinkRepository.generateUniqueShortCode(longUrl);

    const shortLinkObject = new ShortLink(shortUrl, longUrl);

    const shortLinkCreated =
      await this.shortLinkRepository.create(shortLinkObject);

    const shortLink = this.eventPublisher.mergeObjectContext(shortLinkCreated);
    shortLink.apply(new ShortLinkCreatedEvent(shortLinkCreated.getId()!));

    return shortLink.commit();
  }
}
