import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {aspnetroleclaims} from "./aspnetroleclaims";
import {aspnetusers} from "./aspnetusers";


@Entity("aspnetroles",{schema:"dex_stage" } )
@Index("RoleNameIndex",["NormalizedName",],{unique:true})
export class aspnetroles {

    @PrimaryGeneratedColumn({
        type:"bigint", 
        name:"Id"
        })
    Id:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:256,
        name:"Name"
        })
    Name:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        unique: true,
        length:256,
        name:"NormalizedName"
        })
    NormalizedName:string | null;
        

    @Column("longtext",{ 
        nullable:true,
        name:"ConcurrencyStamp"
        })
    ConcurrencyStamp:string | null;
        

   
    @OneToMany(type=>aspnetroleclaims, aspnetroleclaims=>aspnetroleclaims.role,{ onDelete: 'CASCADE' ,onUpdate: 'RESTRICT' })
    aspnetroleclaimss:aspnetroleclaims[];
    

   
    @ManyToMany(type=>aspnetusers, aspnetusers=>aspnetusers.aspnetroless)
    aspnetuserss:aspnetusers[];
    
}
