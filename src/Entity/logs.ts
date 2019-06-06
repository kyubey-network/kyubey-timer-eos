import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("logs",{schema:"dex_stage" } )
export class logs {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"Id"
        })
    Id:number;
        

    @Column("varchar",{ 
        nullable:true,
        name:"Catalog"
        })
    Catalog:string | null;
        

    @Column("int",{ 
        nullable:true,
        name:"Level"
        })
    Level:number | null;
        

    @Column("longtext",{ 
        nullable:true,
        name:"Message"
        })
    Message:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        name:"Position"
        })
    Position:string | null;
        

    @Column("datetime",{ 
        nullable:true,
        name:"Timestamp"
        })
    Timestamp:Date | null;
        
}
