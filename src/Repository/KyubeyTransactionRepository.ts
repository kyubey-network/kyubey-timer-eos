import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Constant } from "src/Entity/constants.entity";
import { Repository } from "typeorm";

@Injectable()
export class KyubeyTransactionRepository {
    constructor(
        @InjectRepository(Constant)
        private readonly constRepository: Repository<Constant>,
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
}