import { InboundMessage } from "@dfuse/client";
//import { DfuseService } from "./DfuseService";
import { Injectable } from "@nestjs/common";
import { SellReceipt, BuyReceipt, BuyMatch } from "src/Model/DexActionsModels";
import { GetSymbolValue } from "src/Lib/Utls";
import { KyubeyTransactionRepository } from "src/Repository/KyubeyTransactionRepository";

@Injectable()
export class KyubeyEosTransactionService {
    constructor(
        private readonly kyubeyTransactionRepository: KyubeyTransactionRepository
    ) { }
    HandlerTransfer(message: InboundMessage) {
        // if (this.dfuseService.IsSomeAction(message, "transfer")) {
        //     const { from, to, quantity, memo } = message.data.trace.act.data
        //     console.log(`${from} -> ${to} ${quantity} (${memo})`);
        // }
    }
    HandlerSellMatchAsync(message: InboundMessage) {
        // if (this.dfuseService.IsSomeAction(message, "sellmatch")) {
        // }
    }
    async HandlerBuyMatchAsync(data: BuyMatch, trx_id: string, block_time: Date) {
        console.log(data)

        const { id, asker, bidder, unit_price } = data;
        let symbol = GetSymbolValue(data.ask).Symbol;
        let askVal = GetSymbolValue(data.ask).Value;
        let bidVal = GetSymbolValue(data.bid).Value;

        try {
            let row = await this.kyubeyTransactionRepository.UpdateBuyMatchAsync(id, symbol, askVal, bidVal, asker, bidder, unit_price, block_time, trx_id);
        } catch (err) {
            console.error(err);
        }
    }
    async HandlerSellReceiptAsync(data: SellReceipt, trx_id: string, block_time: Date) {
        console.log(data)

        let orderId = data.id;
        let symbol = GetSymbolValue(data.ask).Symbol;
        let askVal = GetSymbolValue(data.ask).Value;
        let bidVal = GetSymbolValue(data.bid).Value;
        let unitPrice = data.unit_price;

        try {
            let row = await this.kyubeyTransactionRepository.UpdateSellReceiptAsync(orderId, symbol, data.account, askVal, bidVal, unitPrice, block_time, trx_id);
        } catch (err) {
            console.error(err);
        }
    }
    async HandlerBuyReceiptAsync(data: BuyReceipt, trx_id: string, block_time: Date) {
        console.log(data)

        let orderId = data.id;
        let symbol = GetSymbolValue(data.ask).Symbol;
        let askVal = GetSymbolValue(data.ask).Value;
        let bidVal = GetSymbolValue(data.bid).Value;
        let unitPrice = data.unit_price;

        try {
            let row = await this.kyubeyTransactionRepository.UpdateBuyReceiptAsync(orderId, symbol, data.account, askVal, bidVal, unitPrice, block_time, trx_id);
        } catch (err) {
            console.error(err);
        }
    }
    HandlerCancelBuy(message: InboundMessage) {
        // if (this.dfuseService.IsSomeAction(message, "cancelbuy")) {
        // }
    }
    HandlerCancelSell(message: InboundMessage) {
        // if (this.dfuseService.IsSomeAction(message, "cancelsell")) {
        // }
    }
    HandlerClean(message: InboundMessage) {
        // if (this.dfuseService.IsSomeAction(message, "clean")) {
        // }
    }

}