import { Injectable } from '@nestjs/common';
import { Cron, Interval, Timeout, NestSchedule } from 'nest-schedule';
import { DfuseService } from 'src/Service/DfuseService';
//import { KyubeyEosTransactionService } from 'src/Service/KyubeyEosTransactionService';

@Injectable() // Only support SINGLETON scope
export class EosTransactionJob extends NestSchedule {
    constructor(
        private readonly dfuseService: DfuseService,
        //private readonly kyubeyEosTransactionService: KyubeyEosTransactionService
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

    @Timeout(1000)
    onceJob() {
        console.log('executing once job');

        // this.dfuseService.SearchTransactionsAsync('kyubeydex.bp', { limit: 10, sort: "desc" }).then(resp => {
        //     (resp.transactions || []).map((result) => {

        //     })

        //     console.log(resp);
        // })

        //this.dfuseService.GetActionStreamAsync({ accounts: "eosio.token|ethsidechain",/**  receivers: "kyubeydex.bp",*/action_names:"sellmatch|buyreceipt" }, (message) => {
        this.dfuseService.GetActionStreamAsync({ accounts: "kyubeydex.bp",action_names: "sellmatch|buyreceipt" }, (message) => {

            //this.kyubeyEosTransactionService.HandlerTransfer(message);

        })
    }

    @Interval(2000)
    intervalJob() {
        console.log('executing interval job');

        // if you want to cancel the job, you should return true;
        return true;
    }
}