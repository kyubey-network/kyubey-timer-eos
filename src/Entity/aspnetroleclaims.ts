import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {aspnetroles} from "./aspnetroles";


@Entity("aspnetroleclaims",{schema:"dex_stage" } )
@Index("IX_AspNetRoleClaims_RoleId",["role",])
export class aspnetroleclaims {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"Id"
        })
    Id:number;
        

   
    @ManyToOne(type=>aspnetroles, aspnetroles=>aspnetroles.aspnetroleclaimss,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'RoleId'})
    role:aspnetroles | null;


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
