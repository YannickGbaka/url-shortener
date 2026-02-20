import { Controller, Post, Body, Get, Param, Res } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiMovedPermanentlyResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiParam,
} from '@nestjs/swagger';
import { CreateShortLinkDto } from './dto/create-short-link.dto';
import { ShortLinkResponseDto } from './dto/short-link-response.dto';
import { Response } from 'express';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateShortLinkCommand } from './commands/create-short-link.command';
import { ShortLinksQuery } from './queries/short-links/short-links.query';
import { ShortLink } from './ShortLink';
import { ShortLinkQuery } from './queries/short-link/short-link.query';

@ApiTags('short-links')
@Controller('short-links')
export class ShortLinkController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a short link',
    description:
      'Generates a unique short code for the given long URL. If the URL was already shortened, the existing record is returned.',
  })
  @ApiCreatedResponse({
    description: 'Short link created successfully',
    type: ShortLinkResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid URL provided' })
  async create(@Body() createShortLinkDto: CreateShortLinkDto) {
    return this.commandBus.execute<CreateShortLinkCommand, void>(
      new CreateShortLinkCommand(createShortLinkDto),
    );
  }

  @Get()
  @ApiOperation({
    summary: 'List all short links',
    description:
      'Returns the full list of shortened URLs stored in the database.',
  })
  @ApiOkResponse({
    description: 'List of short links',
    type: [ShortLinkResponseDto],
  })
  findAll(): Promise<ShortLink[]> {
    return this.queryBus.execute<ShortLinksQuery, ShortLink[]>(
      new ShortLinksQuery(),
    );
  }

  @Get(':shortUrl')
  @ApiOperation({
    summary: 'Redirect to long URL',
    description:
      'Resolves the short code and redirects the client to the original long URL with a 301 status.',
  })
  @ApiParam({
    name: 'shortUrl',
    description: 'The short URL code',
    example: 'a1b2c3d',
  })
  @ApiMovedPermanentlyResponse({
    description: 'Redirects to the original long URL',
  })
  @ApiNotFoundResponse({ description: 'Short link not found' })
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
