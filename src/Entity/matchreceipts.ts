import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("matchreceipts",{schema:"dex_stage" } )
@Index("IX_MatchReceipts_Time",["Time",])
@Index("IX_MatchReceipts_TokenId",["TokenId",])
@Index("IsSellMatch",["IsSellMatch",])
export class matchreceipts {

    @Column("varchar",{ 
        nullable:false,
        primary:true,
        length:64,
        name:"Id"
        })
    Id:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:16,
        name:"TokenId"
        })
    TokenId:string | null;
        

    @Column("longtext",{ 
        nullable:true,
        name:"Asker"
        })
    Asker:string | null;
        

    @Column("longtext",{ 
        nullable:true,
        name:"Bidder"
        })
    Bidder:string | null;
        

    @Column("double",{ 
        nullable:false,
        name:"Ask"
        })
    Ask:number;
        

    @Column("double",{ 
        nullable:false,
        name:"Bid"
        })
    Bid:number;
        

    @Column("double",{ 
        nullable:false,
        name:"UnitPrice"
        })
    UnitPrice:number;
        

    @Column("datetime",{ 
        nullable:false,
        name:"Time"
        })
    Time:Date;
        

    @Column("bit",{ 
        nullable:false,
        name:"IsSellMatch"
        })
    IsSellMatch:boolean;
        
}
