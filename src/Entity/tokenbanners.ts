import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("tokenbanners",{schema:"dex_stage" } )
export class tokenbanners {

    @Column("char",{ 
        nullable:false,
        primary:true,
        length:36,
        name:"Id"
        })
    Id:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:16,
        name:"TokenId"
        })
    TokenId:string | null;
        

    @Column("longblob",{ 
        nullable:true,
        name:"Banner"
        })
    Banner:Buffer | null;
        

    @Column("int",{ 
        nullable:false,
        name:"BannerOrder"
        })
    BannerOrder:number;
        
}
