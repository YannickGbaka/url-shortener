import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ShortLinkCreatedEvent } from './short-link-created.event';

@EventsHandler(ShortLinkCreatedEvent)
export class ShortLinkCreatedHandler implements IEventHandler<ShortLinkCreatedEvent> {
  async handle({ shortLinkId }: ShortLinkCreatedEvent): Promise<void> {
    console.log('shortlink created', shortLinkId);
  }
}
