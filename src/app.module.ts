import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortLinkModule } from './short-link/short-link.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '9qasp5v56q8ckkf5dc.leapcellpool.com',
      port: 6438,
      username: 'mnxvjbjiwrhhihcfvmre',
      password: 'tvavnpesscuieefgvtfahhwqqbrinf',
      database: 'ppcgrmqdrpklbckjemhb',
      entities: [__dirname + '/**/*.entity{.ts}'],
      synchronize: true,
      schema: 'myschema',
      autoLoadEntities: true,
      ssl: true,
    }),
    ShortLinkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
