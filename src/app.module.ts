import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortLinkModule } from './short-link/short-link.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres' as const,
          host: configService.get<string>('database.host'),
          port: 6438,
          database: configService.get<string>('database.name'),
          username: configService.get<string>('database.username'),
          password: configService.get<string>('database.password'),
          synchronize: configService.get<boolean>('database.sync') || false,
          schema: configService.get<string>('database.schema'),
          ssl: configService.get<boolean>('database.ssl'),
          autoLoadEntities:
            configService.get<boolean>('database.autoloadEntities') || false,
        };
      },
    }),
    ShortLinkModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
