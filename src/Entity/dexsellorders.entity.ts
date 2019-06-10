import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from "typeorm";


@Entity("dexsellorders")
@Index("IX_DexSellOrders_Time", ["Time",])
@Index("IX_DexSellOrders_TokenId", ["TokenId",])
@Index("IX_DexSellOrders_UnitPrice", ["UnitPrice",])
export class DexSellOrder {

    @Column("int", {
        nullable: false,
        primary: true,
        name: "Id"
    })
    Id: number;


    @Column("varchar", {
        nullable: true,
        length: 16,
        name: "Account"
    })
    Account: string | null;


    @Column("varchar", {
        nullable: true,
        length: 100,
        name: "TransactionId"
    })
    TransactionId: string | null;

    
    @Column("varchar", {
        nullable: false,
        primary: true,
        length: 16,
        name: "TokenId"
    })
    TokenId: string;


    @Column("double", {
        nullable: false,
        name: "Ask"
    })
    Ask: number;


    @Column("double", {
        nullable: false,
        name: "Bid"
    })
    Bid: number;


    @Column("double", {
        nullable: false,
        name: "UnitPrice"
    })
    UnitPrice: number;


    @Column("datetime", {
        nullable: false,
        name: "Time"
    })
    Time: Date;

}
