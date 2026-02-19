import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { ShortLinkService } from './short-link.service';
import { CreateShortLinkDto } from './dto/create-short-link.dto';
import { UpdateShortLinkDto } from './dto/update-short-link.dto';
import { Response } from 'express';
import { ShortLink } from './entities/short-link.entity';

@Controller('short-link')
export class ShortLinkController {
  constructor(private readonly shortLinkService: ShortLinkService) {}

  @Post()
  async create(@Body() createShortLinkDto: CreateShortLinkDto) {
    const linkMetaData = await this.shortLinkService.create(createShortLinkDto);
    return {
      shortLink: linkMetaData.shortUrl,
    };
  }

  @Get()
  findAll(): Promise<ShortLink[]> {
    return this.shortLinkService.findAll();
  }

  @Get(':shortUrl')
  async findOneByLongUrl(
    @Param('shortUrl') shortUl: string,
    @Res() response: Response,
  ) {
    const urlPayload = await this.shortLinkService.findOneByShortUrl(shortUl);
    console.log(urlPayload);
    return response.redirect(301, urlPayload.longUrl);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateShortLinkDto: UpdateShortLinkDto,
  ) {
    return this.shortLinkService.update(+id, updateShortLinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shortLinkService.remove(+id);
  }
}
