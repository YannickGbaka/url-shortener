import { Module } from '@nestjs/common';
import { ShortLinkController } from './short-link.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { ShortLinkRepository } from './db/short-link.repository';
import { ShortLinkFactory } from './db/short-link.factory';
import { ShortLinkCommandHandlers } from './commands';
import { ShortLinkEventHandlers } from './events';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortLinkEntity } from './entities/short-link.entity';

@Module({
  controllers: [ShortLinkController],
  imports: [CqrsModule, TypeOrmModule.forFeature([ShortLinkEntity])],
  providers: [
    ShortLinkRepository,
    ShortLinkFactory,
    ...ShortLinkEventHandlers,
    ...ShortLinkCommandHandlers,
  ],
})
export class ShortLinkModule {}
