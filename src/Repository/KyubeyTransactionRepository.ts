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

    async findAll() {
        try {
            var rows = await this.constRepository.find();
            console.log(rows);
        }
        catch (err) {
            console.error(err);
        }
    }
}