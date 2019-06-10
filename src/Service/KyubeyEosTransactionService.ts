import { InboundMessage } from "@dfuse/client";
//import { DfuseService } from "./DfuseService";
import { Injectable } from "@nestjs/common";
import { SellReceipt, BuyReceipt, BuyMatch, SellMatch, CancelBuy, CancelSell, Clear, AddFav, RemoveFav } from "src/Model/DexActionsModels";
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
    async HandleRemoveFavAsync(data: RemoveFav, account: string, trx_id: string, block_time: Date) {
        const { symbol } = data;
        try {
            await this.kyubeyTransactionRepository.RemoveFavAsync(account, symbol, block_time, trx_id);
        } catch (err) {
            console.error(err);
        }
    }
    async HandleAddFavAsync(data: AddFav, account: string, trx_id: string, block_time: Date) {
        const { symbol } = data;
        try {
            await this.kyubeyTransactionRepository.AddFavAsync(account, symbol, block_time, trx_id);
        } catch (err) {
            console.error(err);
        }
    }
    async HandleClearAsync(data: Clear, trx_id: string, block_time: Date) {
        const { symbol } = data;
        try {
            await this.kyubeyTransactionRepository.ClearAsync(symbol, block_time, trx_id);
        } catch (err) {
            console.error(err);
        }
    }
    async HandleCancelBuyAsync(data: CancelBuy, trx_id: string, block_time: Date) {
        const { id, symbol } = data;
        try {
            let row = await this.kyubeyTransactionRepository.CancelBuyAsync(id, symbol, block_time, trx_id);
        } catch (err) {
            console.error(err);
        }
    }
    async HandleCancelSellAsync(data: CancelSell, trx_id: string, block_time: Date) {
        const { id, symbol } = data;
        try {
            let row = await this.kyubeyTransactionRepository.CancelSellAsync(id, symbol, block_time, trx_id);
        } catch (err) {
            console.error(err);
        }
    }
    async HandleSellMatchAsync(data: SellMatch, trx_id: string, block_time: Date) {
        const { id, asker, bidder, unit_price } = data;
        let symbol = GetSymbolValue(data.bid).Symbol;
        let askVal = GetSymbolValue(data.ask).Value;
        let bidVal = GetSymbolValue(data.bid).Value;

        try {
            let row = await this.kyubeyTransactionRepository.UpdateSellMatchAsync(id, symbol, askVal, bidVal, asker, bidder, unit_price, block_time, trx_id);
        } catch (err) {
            console.error(err);
        }
    }
    async HandleBuyMatchAsync(data: BuyMatch, trx_id: string, block_time: Date) {
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
    async HandleSellReceiptAsync(data: SellReceipt, trx_id: string, block_time: Date) {
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
    async HandleBuyReceiptAsync(data: BuyReceipt, trx_id: string, block_time: Date) {
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
}