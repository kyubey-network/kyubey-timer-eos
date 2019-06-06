import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {alertrules} from "./alertrules";
import {dexes} from "./dexes";
import {favorites} from "./favorites";


@Entity("tokens",{schema:"dex_stage" } )
@Index("IX_Tokens_CurveId",["CurveId",])
@Index("IX_Tokens_Priority",["Priority",])
@Index("IX_Tokens_Name",["Name",])
export class tokens {

    @Column("varchar",{ 
        nullable:false,
        primary:true,
        length:16,
        name:"Id"
        })
    Id:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:32,
        name:"Name"
        })
    Name:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:16,
        name:"CurveId"
        })
    CurveId:string | null;
        

    @Column("json",{ 
        nullable:true,
        name:"CurveArguments"
        })
    CurveArguments:Object | null;
        

    @Column("varchar",{ 
        nullable:true,
        name:"Alert"
        })
    Alert:string | null;
        

    @Column("int",{ 
        nullable:false,
        name:"Priority"
        })
    Priority:number;
        

    @Column("int",{ 
        nullable:false,
        name:"AlertPlan"
        })
    AlertPlan:number;
        

    @Column("int",{ 
        nullable:false,
        name:"NotificationType"
        })
    NotificationType:number;
        

    @Column("int",{ 
        nullable:false,
        name:"Status"
        })
    Status:number;
        

    @Column("bit",{ 
        nullable:false,
        name:"HasIncubation"
        })
    HasIncubation:boolean;
        

    @Column("bit",{ 
        nullable:false,
        name:"HasDex"
        })
    HasDex:boolean;
        

    @Column("bit",{ 
        nullable:false,
        name:"HasContractExchange"
        })
    HasContractExchange:boolean;
        

    @Column("decimal",{ 
        nullable:false,
        precision:65,
        scale:30,
        name:"Raised"
        })
    Raised:string;
        

    @Column("int",{ 
        nullable:false,
        name:"RaisedUserCount"
        })
    RaisedUserCount:number;
        

    @Column("int",{ 
        nullable:false,
        name:"ActionPosition"
        })
    ActionPosition:number;
        

    @Column("varchar",{ 
        nullable:true,
        length:32,
        name:"NewDexId"
        })
    NewDexId:string | null;
        

    @Column("float",{ 
        nullable:true,
        precision:10,
        scale:8,
        name:"NewDexAsk"
        })
    NewDexAsk:number | null;
        

    @Column("float",{ 
        nullable:true,
        precision:10,
        scale:8,
        name:"NewDexBid"
        })
    NewDexBid:number | null;
        

    @Column("float",{ 
        nullable:true,
        precision:10,
        scale:8,
        name:"WhaleExPrice"
        })
    WhaleExPrice:number | null;
        

   
    @OneToMany(type=>alertrules, alertrules=>alertrules.token,{ onDelete: 'NO ACTION' ,onUpdate: 'RESTRICT' })
    alertruless:alertrules[];
    
   
    @OneToMany(type=>favorites, favorites=>favorites.token,{ onDelete: 'CASCADE' ,onUpdate: 'NO ACTION' })
    favoritess:favorites[];
    
}
