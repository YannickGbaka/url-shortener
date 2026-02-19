import { Module } from '@nestjs/common';
import { ShortLinkService } from './short-link.service';
import { ShortLinkController } from './short-link.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortLink } from './entities/short-link.entity';

@Module({
  controllers: [ShortLinkController],
  providers: [ShortLinkService],
  imports: [TypeOrmModule.forFeature([ShortLink])],
})
export class ShortLinkModule {}
