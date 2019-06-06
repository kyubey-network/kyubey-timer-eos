import { Module } from "@nestjs/common";
import { ScheduleModule } from "nest-schedule";
import { DfuseService } from "src/Service/DfuseService";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Constant } from "src/Entity/constants.entity";
import { KyubeyEosTransactionService } from "src/Service/KyubeyEosTransactionService";
import { KyubeyTransactionRepository } from "src/Repository/KyubeyTransactionRepository";
import { EosTransactionJob } from "src/Job/EosTransactionJob";

@Module({
    imports: [

        ScheduleModule.register(),
        TypeOrmModule.forFeature([Constant]),
    ],
    providers: [
        DfuseService,
        EosTransactionJob,
        KyubeyEosTransactionService,
        KyubeyTransactionRepository,
    ],
})
export class SyncTranscationModule {

}