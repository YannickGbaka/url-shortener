import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortLinkModule } from './short-link/short-link.module';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '9qasp5v56q8ckkf5dc.leapcellpool.com:6438',
      username: 'mnxvjbjiwrhhihcfvmre',
      password: 'tvavnpesscuieefgvtfahhwqqbrinf',
      database: 'ppcgrmqdrpklbckjemhb',
      entities: [__dirname + '/**/*.entity{.ts}'],
      synchronize: true,
      ssl: true,
    }),
    ShortLinkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
