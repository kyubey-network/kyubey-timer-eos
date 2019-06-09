import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Constant } from "src/Entity/constants.entity";
import { Repository, Db } from "typeorm";
import { DexBuyOrder } from "src/Entity/dexbuyorders";

@Injectable()
export class KyubeyTransactionRepository {
    constructor(
        @InjectRepository(Constant)
        private readonly constRepository: Repository<Constant>,
        private readonly dexBuyOrderRepository: Repository<DexBuyOrder>,
    ) { }
    async getLastSyncBlockNo() {
        let val = await this.GetDbConst("sync_block_no");
        return parseInt(val);
    }
    private async GetDbConst(key: string) {
        let row = await this.constRepository.findOne(key);
        if (row) {
            return row.Value;
        }
        return null;
    }
    private async UpdateDbConst(key: string, value: string): Promise<void> {
        let row = await this.constRepository.findOne(key);
        if (row) {
            row.Value = value;
            await this.constRepository.save(row);
        }
    }
    async UpdateBuyReceiptAsync(orderId: number, symbol: string, account: string, ask: number, bid: number, unitPrice: number, timestamp: number, trx_id: string): Promise<void> {
        let row = await this.dexBuyOrderRepository.findOne({ Id: orderId, TokenId: symbol });
        if (row) {
            await this.dexBuyOrderRepository.remove(row);
        }

        let newRow = new DexBuyOrder();
        newRow.Account = account;
        newRow.Id = orderId;
        newRow.Ask = ask;
        newRow.Bid = bid;
        newRow.UnitPrice = unitPrice / 100000000.0;
        newRow.Time = new Date(timestamp);
        newRow.TokenId = symbol;
        await this.dexBuyOrderRepository.save(newRow);
    }
}