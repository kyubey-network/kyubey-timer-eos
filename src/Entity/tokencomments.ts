import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {aspnetusers} from "./aspnetusers";


@Entity("tokencomments",{schema:"dex_stage" } )
@Index("IX_TokenComments_ReplyUserId",["replyUser",])
@Index("IX_TokenComments_UserId",["user",])
export class tokencomments {

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
        

    @Column("char",{ 
        nullable:true,
        length:36,
        name:"ParentCommentId"
        })
    ParentCommentId:string | null;
        

    @Column("datetime",{ 
        nullable:false,
        name:"CreateTime"
        })
    CreateTime:Date;
        

   
    @ManyToOne(type=>aspnetusers, aspnetusers=>aspnetusers.tokencommentss2,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'UserId'})
    user:aspnetusers | null;


   
    @ManyToOne(type=>aspnetusers, aspnetusers=>aspnetusers.tokencommentss,{ onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'ReplyUserId'})
    replyUser:aspnetusers | null;


    @Column("bit",{ 
        nullable:false,
        name:"IsDelete"
        })
    IsDelete:boolean;
        

    @Column("datetime",{ 
        nullable:true,
        name:"DeleteTime"
        })
    DeleteTime:Date | null;
        

    @Column("longtext",{ 
        nullable:true,
        name:"Content"
        })
    Content:string | null;
        
}
