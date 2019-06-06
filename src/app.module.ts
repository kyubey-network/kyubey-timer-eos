import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EosTransactionJob } from './Job/EosTransactionJob';
import { ScheduleModule } from 'nest-schedule';
import { DfuseService } from './Service/DfuseService';
import { KyubeyEosTransactionService } from './Service/KyubeyEosTransactionService';

@Module({
  imports: [
    ScheduleModule.register(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    EosTransactionJob,
    DfuseService,
    KyubeyEosTransactionService
  ],
})
export class AppModule { }
