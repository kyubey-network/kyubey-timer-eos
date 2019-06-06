import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {tokens} from "./tokens";


@Entity("dexes",{schema:"dex_stage" } )
@Index("Status",["Status",])
export class dexes {

   
    @OneToOne(type=>tokens, tokens=>tokens.dexes,{ primary:true, nullable:false,onDelete: 'CASCADE',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'Id'})
    :tokens | null;


    @Column("int",{ 
        nullable:false,
        name:"Status"
        })
    Status:number;
        

    @Column("bigint",{ 
        nullable:false,
        name:"Transactions"
        })
    Transactions:string;
        

    @Column("double",{ 
        nullable:false,
        name:"PriceMin"
        })
    PriceMin:number;
        

    @Column("double",{ 
        nullable:false,
        name:"PriceMax"
        })
    PriceMax:number;
        
}
