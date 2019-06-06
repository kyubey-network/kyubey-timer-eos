import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {aspnetusers} from "./aspnetusers";


@Entity("tokencommentpraises",{schema:"dex_stage" } )
@Index("IX_TokenCommentPraises_UserId",["user",])
export class tokencommentpraises {

    @Column("char",{ 
        nullable:false,
        primary:true,
        length:36,
        name:"Id"
        })
    Id:string;
        

    @Column("char",{ 
        nullable:false,
        length:36,
        name:"CommentId"
        })
    CommentId:string;
        

    @Column("bit",{ 
        nullable:false,
        name:"IsPraise"
        })
    IsPraise:boolean;
        

   
    @ManyToOne(type=>aspnetusers, aspnetusers=>aspnetusers.tokencommentpraisess,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'UserId'})
    user:aspnetusers | null;


    @Column("datetime",{ 
        nullable:false,
        name:"CreateTime"
        })
    CreateTime:Date;
        
}
