import { CreateShortLinkDto } from '../dto/create-short-link.dto';
export class CreateShortLinkCommand {
  constructor(public readonly createShortLinkDto: CreateShortLinkDto) {}
}
