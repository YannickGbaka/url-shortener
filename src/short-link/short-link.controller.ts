import { Controller, Post, Body, Get, Param, Res } from '@nestjs/common';
import { CreateShortLinkDto } from './dto/create-short-link.dto';
import { Response } from 'express';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateShortLinkCommand } from './commands/create-short-link.command';
import { ShortLinksQuery } from './queries/short-links/short-links.query';
import { ShortLink } from './ShortLink';
import { ShortLinkQuery } from './queries/short-link/short-link.query';

@Controller('short-link')
export class ShortLinkController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() createShortLinkDto: CreateShortLinkDto) {
    return this.commandBus.execute<CreateShortLinkCommand, void>(
      new CreateShortLinkCommand(createShortLinkDto),
    );
  }

  @Get()
  findAll(): Promise<ShortLink[]> {
    return this.queryBus.execute<ShortLinksQuery, ShortLink[]>(
      new ShortLinksQuery(),
    );
  }

  @Get(':shortUrl')
  async findOneByShortUrl(
    @Param('shortUrl') shortUl: string,
    @Res() response: Response,
  ) {
    const urlPayload = await this.queryBus.execute<ShortLinkQuery, ShortLink>(
      new ShortLinkQuery(shortUl),
    );

    console.log(urlPayload);
    return response.redirect(301, urlPayload.getLongUrl());
  }

  // @Delete(':shortUrl')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // async remove(@Param('shortUrl') shortUrl: string) {
  //   await this.shortLinkService.removeByShortLink(shortUrl);
  // }
}
