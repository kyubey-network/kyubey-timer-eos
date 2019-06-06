import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {aspnetusers} from "./aspnetusers";


@Entity("aspnetuserlogins",{schema:"dex_stage" } )
@Index("IX_AspNetUserLogins_UserId",["user",])
export class aspnetuserlogins {

    @Column("varchar",{ 
        nullable:false,
        primary:true,
        name:"LoginProvider"
        })
    LoginProvider:string;
        

    @Column("varchar",{ 
        nullable:false,
        primary:true,
        name:"ProviderKey"
        })
    ProviderKey:string;
        

    @Column("longtext",{ 
        nullable:true,
        name:"ProviderDisplayName"
        })
    ProviderDisplayName:string | null;
        

   
    @ManyToOne(type=>aspnetusers, aspnetusers=>aspnetusers.aspnetuserloginss,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'UserId'})
    user:aspnetusers | null;

}
