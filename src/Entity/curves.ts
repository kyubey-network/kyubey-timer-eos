import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("curves",{schema:"dex_stage" } )
export class curves {

    @Column("varchar",{ 
        nullable:false,
        primary:true,
        length:16,
        name:"Id"
        })
    Id:string;
        

    @Column("longtext",{ 
        nullable:true,
        name:"Description"
        })
    Description:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:128,
        name:"PriceSupplyFunction"
        })
    PriceSupplyFunction:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:128,
        name:"PriceBalanceFunction"
        })
    PriceBalanceFunction:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:128,
        name:"BalanceSupplyFunction"
        })
    BalanceSupplyFunction:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:128,
        name:"SupplyBalanceFunction"
        })
    SupplyBalanceFunction:string | null;
        

    @Column("json",{ 
        nullable:true,
        name:"Arguments"
        })
    Arguments:Object | null;
        
}
