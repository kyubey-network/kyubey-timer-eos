import { InboundMessage } from "@dfuse/client";
import { DfuseService } from "./DfuseService";
import { Injectable } from "@nestjs/common";

@Injectable()
export class KyubeyEosTransactionService {
    constructor(
        private readonly dfuseService: DfuseService
    ) { }
    HandlerTransfer(message: InboundMessage) {
        if (this.dfuseService.IsSomeAction(message, "transfer")) {
            const { from, to, quantity, memo } = message.data.trace.act.data
            console.log(`${from} -> ${to} ${quantity} (${memo})`);
        }
    }
    HandlerSellMatch(message: InboundMessage) {
        if (this.dfuseService.IsSomeAction(message, "sellmatch")) {
        }
    }
    HandlerBuyMatch(message: InboundMessage) {
        if (this.dfuseService.IsSomeAction(message, "buymatch")) {
        }
    }
    HandlerSellReceipt(message: InboundMessage) {
        if (this.dfuseService.IsSomeAction(message, "sellreceipt")) {
        }
    }
    HandlerBuyReceipt(message: InboundMessage) {
        if (this.dfuseService.IsSomeAction(message, "buyreceipt")) {
        }
    }
    HandlerCancelBuy(message: InboundMessage) {
        if (this.dfuseService.IsSomeAction(message, "cancelbuy")) {
        }
    }
    HandlerCancelSell(message: InboundMessage) {
        if (this.dfuseService.IsSomeAction(message, "cancelsell")) {
        }
    }
    HandlerClean(message: InboundMessage) {
        if (this.dfuseService.IsSomeAction(message, "clean")) {
        }
    }

}