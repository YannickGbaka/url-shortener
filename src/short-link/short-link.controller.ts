import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShortLinkService } from './short-link.service';
import { CreateShortLinkDto } from './dto/create-short-link.dto';
import { UpdateShortLinkDto } from './dto/update-short-link.dto';
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
  findAll() {
    return this.shortLinkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shortLinkService.findOne(+id);
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
