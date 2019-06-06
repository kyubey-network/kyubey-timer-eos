import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("raiselogs",{schema:"dex_stage" } )
@Index("Timestamp",["Timestamp",])
@Index("TokenId",["TokenId",])
@Index("Account",["Account",])
export class raiselogs {

    @Column("char",{ 
        nullable:false,
        primary:true,
        length:36,
        name:"Id"
        })
    Id:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:16,
        name:"TokenId"
        })
    TokenId:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:16,
        name:"Account"
        })
    Account:string;
        

    @Column("datetime",{ 
        nullable:false,
        name:"Timestamp"
        })
    Timestamp:Date;
        

    @Column("float",{ 
        nullable:false,
        precision:16,
        scale:4,
        name:"Amount"
        })
    Amount:number;
        
}
