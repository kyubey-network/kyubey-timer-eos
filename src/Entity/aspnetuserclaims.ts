import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {aspnetusers} from "./aspnetusers";


@Entity("aspnetuserclaims",{schema:"dex_stage" } )
@Index("IX_AspNetUserClaims_UserId",["user",])
export class aspnetuserclaims {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"Id"
        })
    Id:number;
        

   
    @ManyToOne(type=>aspnetusers, aspnetusers=>aspnetusers.aspnetuserclaimss,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'UserId'})
    user:aspnetusers | null;


    @Column("longtext",{ 
        nullable:true,
        name:"ClaimType"
        })
    ClaimType:string | null;
        

    @Column("longtext",{ 
        nullable:true,
        name:"ClaimValue"
        })
    ClaimValue:string | null;
        
}
