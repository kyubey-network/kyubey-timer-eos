import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {aspnetuserclaims} from "./aspnetuserclaims";
import {aspnetuserlogins} from "./aspnetuserlogins";
import {aspnetusertokens} from "./aspnetusertokens";
import {tokencommentpraises} from "./tokencommentpraises";
import {tokencomments} from "./tokencomments";
import {aspnetroles} from "./aspnetroles";


@Entity("aspnetusers",{schema:"dex_stage" } )
@Index("UserNameIndex",["NormalizedUserName",],{unique:true})
@Index("EmailIndex",["NormalizedEmail",])
export class aspnetusers {

    @PrimaryGeneratedColumn({
        type:"bigint", 
        name:"Id"
        })
    Id:string;
        

    @Column("varchar",{ 
        nullable:true,
        length:256,
        name:"UserName"
        })
    UserName:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        unique: true,
        length:256,
        name:"NormalizedUserName"
        })
    NormalizedUserName:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:256,
        name:"Email"
        })
    Email:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:256,
        name:"NormalizedEmail"
        })
    NormalizedEmail:string | null;
        

    @Column("bit",{ 
        nullable:false,
        name:"EmailConfirmed"
        })
    EmailConfirmed:boolean;
        

    @Column("longtext",{ 
        nullable:true,
        name:"PasswordHash"
        })
    PasswordHash:string | null;
        

    @Column("longtext",{ 
        nullable:true,
        name:"SecurityStamp"
        })
    SecurityStamp:string | null;
        

    @Column("longtext",{ 
        nullable:true,
        name:"ConcurrencyStamp"
        })
    ConcurrencyStamp:string | null;
        

    @Column("longtext",{ 
        nullable:true,
        name:"PhoneNumber"
        })
    PhoneNumber:string | null;
        

    @Column("bit",{ 
        nullable:false,
        name:"PhoneNumberConfirmed"
        })
    PhoneNumberConfirmed:boolean;
        

    @Column("bit",{ 
        nullable:false,
        name:"TwoFactorEnabled"
        })
    TwoFactorEnabled:boolean;
        

    @Column("datetime",{ 
        nullable:true,
        name:"LockoutEnd"
        })
    LockoutEnd:Date | null;
        

    @Column("bit",{ 
        nullable:false,
        name:"LockoutEnabled"
        })
    LockoutEnabled:boolean;
        

    @Column("int",{ 
        nullable:false,
        name:"AccessFailedCount"
        })
    AccessFailedCount:number;
        

   
    @OneToMany(type=>aspnetuserclaims, aspnetuserclaims=>aspnetuserclaims.user,{ onDelete: 'CASCADE' ,onUpdate: 'RESTRICT' })
    aspnetuserclaimss:aspnetuserclaims[];
    

   
    @OneToMany(type=>aspnetuserlogins, aspnetuserlogins=>aspnetuserlogins.user,{ onDelete: 'CASCADE' ,onUpdate: 'RESTRICT' })
    aspnetuserloginss:aspnetuserlogins[];
    

   
    @OneToMany(type=>aspnetusertokens, aspnetusertokens=>aspnetusertokens.user,{ onDelete: 'CASCADE' ,onUpdate: 'RESTRICT' })
    aspnetusertokenss:aspnetusertokens[];
    

   
    @OneToMany(type=>tokencommentpraises, tokencommentpraises=>tokencommentpraises.user,{ onDelete: 'CASCADE' ,onUpdate: 'RESTRICT' })
    tokencommentpraisess:tokencommentpraises[];
    

   
    @OneToMany(type=>tokencomments, tokencomments=>tokencomments.replyUser,{ onDelete: 'RESTRICT' ,onUpdate: 'RESTRICT' })
    tokencommentss:tokencomments[];
    

   
    @OneToMany(type=>tokencomments, tokencomments=>tokencomments.user,{ onDelete: 'CASCADE' ,onUpdate: 'RESTRICT' })
    tokencommentss2:tokencomments[];
    

   
    @ManyToMany(type=>aspnetroles, aspnetroles=>aspnetroles.aspnetuserss,{  nullable:false, })
    @JoinTable({ name:'aspnetuserroles'})
    aspnetroless:aspnetroles[];
    
}
