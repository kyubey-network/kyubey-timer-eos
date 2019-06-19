import { Injectable } from '@nestjs/common';
import { Cron, Interval, Timeout, NestSchedule } from 'nest-schedule';
import { DfuseService } from 'src/Service/DfuseService';
import { DfuseApiService } from 'src/Service/DfuseApiService';
import { async } from 'rxjs/internal/scheduler/async';
import { KyubeyEosTransactionService } from 'src/Service/KyubeyEosTransactionService';
import { ActionTrace } from '@dfuse/client';
import { KyubeyTransactionRepository } from 'src/Repository/KyubeyTransactionRepository';

@Injectable() // Only support SINGLETON scope
export class EosTransactionJob extends NestSchedule {
    constructor(
        private readonly dfuseService: DfuseService,
        private readonly dfuseApiService: DfuseApiService,
        private readonly kyubeyEosTransactionService: KyubeyEosTransactionService,
        private readonly kyubeyTransactionRepository: KyubeyTransactionRepository
    ) {
        super();
    }
    @Cron('0 0 2 * *', {
        startTime: new Date(),
        endTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    })
    async cronJob() {
        console.log('executing cron job');
    }

    @Timeout(1)
    async onceJob() {
        console.log('executing once job');





        //this.dfuseService.GetActionStreamAsync({ accounts: "eosio.token|ethsidechain",/**  receivers: "kyubeydex.bp",*/action_names:"sellmatch|buyreceipt" }, (message) => {
        // this.dfuseService.GetActionStreamAsync({ accounts: "kyubeydex.bp", action_names: "sellmatch|sellreceipt|buymatch|buyreceipt|addfav|removefav|clean|cancelsell|cancelbuy" }, (message) => {
        // })
    }

    @Interval(1000 * 5, { waiting: true, immediate: true })
    async intervalJob() {
        console.log('executing interval job');

        let lastSyncBlockNo = await this.kyubeyTransactionRepository.GetLastSyncBlockNo();
        let historyList = await this.dfuseApiService.GetKyubeyHistoryAsync(50, lastSyncBlockNo);

        for (var h = 0; h < historyList.transactions.length; h++) {
            let trans = historyList.transactions[h];
            let inlineTraces = <ActionTrace<any>[]>trans.lifecycle.execution_trace.action_traces[0].inline_traces;

            let doActionAsync = async (trace) => {
                if (trace.block_num > lastSyncBlockNo) {
                    lastSyncBlockNo = trace.block_num;
                }
                await this.kyubeyEosTransactionService.HandleActionTraceAsync(trace);
            }

            if (!inlineTraces) {
                let trace = <ActionTrace<any>>trans.lifecycle.execution_trace.action_traces[0];
                await doActionAsync(trace);
                continue;
            }

            for (var i = 0; i < inlineTraces.length; i++) {
                let trace = inlineTraces[i];
                await doActionAsync(trace);
            }
        }

        await this.kyubeyTransactionRepository.SetLastSyncBlockNo(lastSyncBlockNo);

        // if you want to cancel the job, you should return true;
        //return true;
    }
}