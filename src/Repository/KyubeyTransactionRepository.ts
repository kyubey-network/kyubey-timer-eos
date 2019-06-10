import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Constant } from "src/Entity/constants.entity";
import { Repository, Db, Connection } from "typeorm";
import { DexBuyOrder } from "src/Entity/dexbuyorders.entity";
import { DexSellOrder } from "src/Entity/dexsellorders.entity";
import { MatchReceipt } from "src/Entity/matchreceipts.entity";
import { Favorite } from "src/Entity/favorites.entity";
import { Token } from "src/Entity/tokens.entity";

@Injectable()
export class KyubeyTransactionRepository {
    constructor(
        @InjectRepository(Constant)
        private readonly constRepository: Repository<Constant>,
        @InjectRepository(DexBuyOrder)
        private readonly dexBuyOrderRepository: Repository<DexBuyOrder>,
        @InjectRepository(DexSellOrder)
        private readonly dexSellOrderRepository: Repository<DexSellOrder>,
        @InjectRepository(MatchReceipt)
        private readonly matchReceiptRepository: Repository<MatchReceipt>,
        @InjectRepository(Favorite)
        private readonly favoriteRepository: Repository<Favorite>,
        @InjectRepository(Token)
        private readonly tokenRepository: Repository<Token>,
        private readonly connection: Connection
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
    async UpdateBuyReceiptAsync(orderId: number, symbol: string, account: string, ask: number, bid: number, unitPrice: number, block_time: Date, trx_id: string): Promise<DexBuyOrder> {
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
        newRow.Time = block_time;
        newRow.TokenId = symbol;
        newRow.TransactionId = trx_id;

        await this.dexBuyOrderRepository.save(newRow);
        return newRow;
    }
    async UpdateSellReceiptAsync(orderId: number, symbol: string, account: string, ask: number, bid: number, unitPrice: number, block_time: Date, trx_id: string): Promise<DexSellOrder> {
        let row = await this.dexSellOrderRepository.findOne({ Id: orderId, TokenId: symbol });
        if (row) {
            await this.dexSellOrderRepository.remove(row);
        }

        let newRow = new DexSellOrder();
        newRow.Account = account;
        newRow.Id = orderId;
        newRow.Ask = ask;
        newRow.Bid = bid;
        newRow.UnitPrice = unitPrice / 100000000.0;
        newRow.Time = block_time;
        newRow.TokenId = symbol;
        newRow.TransactionId = trx_id;

        await this.dexSellOrderRepository.save(newRow);
        return newRow;
    }
    async UpdateBuyMatchAsync(orderId: number, symbol: string, ask: number, bid: number, asker: string, bidder: string, unitPrice: number, block_time: Date, trx_id: string): Promise<MatchReceipt> {
        let row = await this.dexSellOrderRepository.findOne({ Id: orderId, TokenId: symbol });
        if (row) {
            row.Bid -= ask;
            row.Ask -= bid;
            if (row.Ask <= 0 || row.Bid <= 0) {
                await this.dexSellOrderRepository.remove(row);
            }
        }

        let newRow = new MatchReceipt();

        newRow.Ask = ask;
        newRow.Bid = bid;
        newRow.Asker = asker;
        newRow.Bidder = bidder;
        newRow.Time = block_time;
        newRow.TokenId = symbol;
        newRow.TransactionId = trx_id;
        newRow.UnitPrice = unitPrice / 100000000.0;
        newRow.IsSellMatch = false;

        await this.matchReceiptRepository.save(newRow);
        return newRow;
    }
    async UpdateSellMatchAsync(orderId: number, symbol: string, ask: number, bid: number, asker: string, bidder: string, unitPrice: number, block_time: Date, trx_id: string): Promise<MatchReceipt> {
        let row = await this.dexBuyOrderRepository.findOne({ Id: orderId, TokenId: symbol });
        if (row) {
            row.Bid -= ask;
            row.Ask -= bid;
            if (row.Ask <= 0 || row.Bid <= 0) {
                await this.dexBuyOrderRepository.remove(row);
            }
        }

        let newRow = new MatchReceipt();

        newRow.Ask = ask;
        newRow.Bid = bid;
        newRow.Asker = asker;
        newRow.Bidder = bidder;
        newRow.Time = block_time;
        newRow.TokenId = symbol;
        newRow.TransactionId = trx_id;
        newRow.UnitPrice = unitPrice / 100000000.0;
        newRow.IsSellMatch = true;

        await this.matchReceiptRepository.save(newRow);
        return newRow;
    }
    async CancelBuyAsync(orderId: number, symbol: string, block_time: Date, trx_id: string): Promise<void> {
        let row = await this.dexBuyOrderRepository.findOne({ Id: orderId, TokenId: symbol });
        if (row) {
            await this.dexBuyOrderRepository.remove(row);
        }
    }
    async CancelSellAsync(orderId: number, symbol: string, block_time: Date, trx_id: string): Promise<void> {
        let row = await this.dexSellOrderRepository.findOne({ Id: orderId, TokenId: symbol });
        if (row) {
            await this.dexSellOrderRepository.remove(row);
        }
    }
    async ClearAsync(symbol: string, block_time: Date, trx_id: string): Promise<void> {
        this.connection
            .createQueryBuilder()
            .delete()
            .from(DexBuyOrder)
            .where("TokenId=:symbol", { symbol })
            .execute();

        this.connection
            .createQueryBuilder()
            .delete()
            .from(DexSellOrder)
            .where("TokenId=:symbol", { symbol })
            .execute();
    }
    async AddFavAsync(account: string, symbol: string, block_time: Date, trx_id: string): Promise<void> {
        let token = await this.tokenRepository.findOne({ Id: symbol });
        if (token) {
            let row = await this.favoriteRepository.findOne({ Account: account, Token: token })
            if (!row) {
                let newRow = new Favorite();

                newRow.Account = account;
                newRow.Token = token;

                await this.favoriteRepository.save(newRow);
            }
        }
    }
    async RemoveFavAsync(account: string, symbol: string, block_time: Date, trx_id: string): Promise<void> {
        let token = await this.tokenRepository.findOne({ Id: symbol });
        if (token) {
            let row = await this.favoriteRepository.findOne({ Account: account, Token: token })
            if (row) {
                await this.favoriteRepository.remove(row);
            }
        }
    }
}