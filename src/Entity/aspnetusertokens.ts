import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {aspnetusers} from "./aspnetusers";


@Entity("aspnetusertokens",{schema:"dex_stage" } )
export class aspnetusertokens {

   
    @ManyToOne(type=>aspnetusers, aspnetusers=>aspnetusers.aspnetusertokenss,{ primary:true, nullable:false,onDelete: 'CASCADE',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'UserId'})
    user:aspnetusers | null;


    @Column("varchar",{ 
        nullable:false,
        primary:true,
        name:"LoginProvider"
        })
    LoginProvider:string;
        

    @Column("varchar",{ 
        nullable:false,
        primary:true,
        name:"Name"
        })
    Name:string;
        

    @Column("longtext",{ 
        nullable:true,
        name:"Value"
        })
    Value:string | null;
        
}
