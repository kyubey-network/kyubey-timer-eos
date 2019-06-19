import { InboundMessage, ActionTrace } from "@dfuse/client";
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
    async HandleActionTraceAsync(trace: ActionTrace<any>) {

        if (trace.act.name != 'transfer') {
            console.log(trace.act.name);
        }

        switch (trace.act.name) {
            case "buyreceipt":
                if (!trace.act.data.o) {
                    console.error('buyreceipt error', trace.act.data);
                    break;
                }
                await this.HandleBuyReceiptAsync(trace.act.data.o, trace.trx_id, new Date(trace.block_time + "Z"));
                break;
            case "sellreceipt":
                if (!trace.act.data.t) {
                    console.error('sellreceipt error', trace.act.data);
                    break;
                }
                await this.HandleSellReceiptAsync(trace.act.data.t, trace.trx_id, new Date(trace.block_time + "Z"));
                break;
            case "buymatch":
                if (!trace.act.data.t) {
                    console.error('buymatch error', trace.act.data);
                    break;
                }
                await this.HandleBuyMatchAsync(trace.act.data.t, trace.trx_id, new Date(trace.block_time + "Z"), trace.receipt.act_digest);
                break;
            case "sellmatch":
                if (!trace.act.data.t) {
                    console.error('sellmatch error', trace.act.data);
                    break;
                }
                await this.HandleSellMatchAsync(trace.act.data.t, trace.trx_id, new Date(trace.block_time + "Z"), trace.receipt.act_digest);
                break;
            case "cancelbuy":
                await this.HandleCancelBuyAsync(trace.act.data, trace.trx_id, new Date(trace.block_time + "Z"));
                break;
            case "cancelsell":
                await this.HandleCancelSellAsync(trace.act.data, trace.trx_id, new Date(trace.block_time + "Z"));
                break;
            case "clean":
                await this.HandleClearAsync(trace.act.data, trace.trx_id, new Date(trace.block_time + "Z"));
                break;
            case "removefav":
                await this.HandleRemoveFavAsync(trace.act.data, trace.act.authorization[0].actor, trace.trx_id, new Date(trace.block_time + "Z"));
                break;
            case "addfav":
                await this.HandleAddFavAsync(trace.act.data, trace.act.authorization[0].actor, trace.trx_id, new Date(trace.block_time + "Z"));
                break;
            default:
                break;
        }
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
    async HandleSellMatchAsync(data: SellMatch, trx_id: string, block_time: Date, act_digest: string) {
        const { id, asker, bidder, unit_price } = data;
        let symbol = GetSymbolValue(data.bid).Symbol;
        let askVal = GetSymbolValue(data.ask).Value;
        let bidVal = GetSymbolValue(data.bid).Value;

        try {
            let row = await this.kyubeyTransactionRepository.UpdateSellMatchAsync(id, symbol, askVal, bidVal, asker, bidder, unit_price, block_time, trx_id, act_digest);
        } catch (err) {
            console.error(err);
        }
    }
    async HandleBuyMatchAsync(data: BuyMatch, trx_id: string, block_time: Date, act_digest: string) {
        const { id, asker, bidder, unit_price } = data;
        let symbol = GetSymbolValue(data.ask).Symbol;
        let askVal = GetSymbolValue(data.ask).Value;
        let bidVal = GetSymbolValue(data.bid).Value;

        try {
            let row = await this.kyubeyTransactionRepository.UpdateBuyMatchAsync(id, symbol, askVal, bidVal, asker, bidder, unit_price, block_time, trx_id, act_digest);
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