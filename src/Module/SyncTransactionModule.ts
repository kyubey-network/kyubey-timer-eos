import { Module } from "@nestjs/common";
import { ScheduleModule } from "nest-schedule";
import { DfuseService } from "src/Service/DfuseService";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Constant } from "src/Entity/constants.entity";
import { KyubeyEosTransactionService } from "src/Service/KyubeyEosTransactionService";
import { KyubeyTransactionRepository } from "src/Repository/KyubeyTransactionRepository";
import { EosTransactionJob } from "src/Job/EosTransactionJob";
import { DexBuyOrder } from "src/Entity/dexbuyorders.entity";
import { DexSellOrder } from "src/Entity/dexsellorders.entity";
import { MatchReceipt } from "src/Entity/matchreceipts.entity";
import { Token } from "src/Entity/tokens.entity";
import { Favorite } from "src/Entity/favorites.entity";

@Module({
    imports: [

        ScheduleModule.register(),
        TypeOrmModule.forFeature([Constant, DexBuyOrder, DexSellOrder, MatchReceipt, Token, Favorite]),
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