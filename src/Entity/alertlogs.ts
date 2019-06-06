import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {alertrules} from "./alertrules";


@Entity("alertlogs",{schema:"dex_stage" } )
@Index("IX_AlertLogs_AlertRuleId",["alertRule",])
export class alertlogs {

    @Column("char",{ 
        nullable:false,
        primary:true,
        length:36,
        name:"Id"
        })
    Id:string;
        

    @Column("datetime",{ 
        nullable:false,
        name:"CreatedTime"
        })
    CreatedTime:Date;
        

   
    @ManyToOne(type=>alertrules, alertrules=>alertrules.alertlogss,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'AlertRuleId'})
    alertRule:alertrules | null;


    @Column("longtext",{ 
        nullable:true,
        name:"Message"
        })
    Message:string | null;
        
}
