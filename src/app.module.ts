import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseProviders } from './database.provider';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [...databaseProviders, AppService],
})
export class AppModule {}
