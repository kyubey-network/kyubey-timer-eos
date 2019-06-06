import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SyncTranscationModule } from './Module/SyncTransactionModule';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    SyncTranscationModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule { }
