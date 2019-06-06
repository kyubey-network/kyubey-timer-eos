import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("tokenhatcherpraises",{schema:"dex_stage" } )
export class tokenhatcherpraises {

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
        

    @Column("longtext",{ 
        nullable:true,
        name:"UserId"
        })
    UserId:string | null;
        

    @Column("datetime",{ 
        nullable:false,
        name:"CreateTime"
        })
    CreateTime:Date;
        
}
