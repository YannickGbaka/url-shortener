import { Controller, Post, Body } from '@nestjs/common';
import { CreateShortLinkDto } from './dto/create-short-link.dto';
import { Response } from 'express';
import { CommandBus } from '@nestjs/cqrs';
import { CreateShortLinkCommand } from './commands/create-short-link.command';

@Controller('short-link')
export class ShortLinkController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async create(@Body() createShortLinkDto: CreateShortLinkDto) {
    return this.commandBus.execute<CreateShortLinkCommand, void>(
      new CreateShortLinkCommand(createShortLinkDto),
    );
  }

  // @Get()
  // findAll(): Promise<ShortLinkEntity[]> {
  //   return this.
  // }

  // @Get(':shortUrl')
  // async findOneByLongUrl(
  //   @Param('shortUrl') shortUl: string,
  //   @Res() response: Response,
  // ) {
  //   const urlPayload = await this.shortLinkService.findOneByShortUrl(shortUl);
  //   console.log(urlPayload);
  //   return response.redirect(301, urlPayload.longUrl);
  // }

  // @Delete(':shortUrl')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // async remove(@Param('shortUrl') shortUrl: string) {
  //   await this.shortLinkService.removeByShortLink(shortUrl);
  // }
}
