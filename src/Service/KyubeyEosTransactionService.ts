import { InboundMessage } from "@dfuse/client";
//import { DfuseService } from "./DfuseService";
import { Injectable } from "@nestjs/common";
import { SellReceipt, BuyReceipt } from "src/Model/DexActionsModels";
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
    HandlerSellMatch(message: InboundMessage) {
        // if (this.dfuseService.IsSomeAction(message, "sellmatch")) {
        // }
    }
    HandlerBuyMatch(message: InboundMessage) {
        // if (this.dfuseService.IsSomeAction(message, "buymatch")) {
        // }
    }
    HandlerSellReceipt(data: SellReceipt, trx_id: string) {
        // if (this.dfuseService.IsSomeAction(message, "sellreceipt")) {
        // }
    }
    HandlerBuyReceipt(data: BuyReceipt, trx_id: string) {
        console.log(data)

        let orderId = data.id;
        let symbol = GetSymbolValue(data.ask).Symbol;
        let askVal = GetSymbolValue(data.ask).Value;
        let bidVal = GetSymbolValue(data.bid).Value;
        let unitPrice = data.unit_price;
        let timestamp = data.timestamp;

        this.kyubeyTransactionRepository.UpdateBuyReceiptAsync(orderId, symbol, data.account, askVal, bidVal, unitPrice, timestamp, trx_id);
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