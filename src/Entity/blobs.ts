import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";


@Entity("blobs",{schema:"dex_stage" } )
@Index("IX_Blobs_FileName",["FileName",])
@Index("IX_Blobs_Time",["Time",])
export class blobs {

    @Column("char",{ 
        nullable:false,
        primary:true,
        length:36,
        name:"Id"
        })
    Id:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:128,
        name:"FileName"
        })
    FileName:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:128,
        name:"ContentType"
        })
    ContentType:string | null;
        

    @Column("bigint",{ 
        nullable:false,
        name:"ContentLength"
        })
    ContentLength:string;
        

    @Column("datetime",{ 
        nullable:false,
        name:"Time"
        })
    Time:Date;
        

    @Column("longblob",{ 
        nullable:true,
        name:"Bytes"
        })
    Bytes:Buffer | null;
        
}
