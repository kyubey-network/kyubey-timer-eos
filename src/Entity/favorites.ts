import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {tokens} from "./tokens";


@Entity("favorites",{schema:"dex_stage" } )
@Index("TokenId",["token",])
export class favorites {

    @Column("varchar",{ 
        nullable:false,
        primary:true,
        length:16,
        name:"Account"
        })
    Account:string;
        

   
    @ManyToOne(type=>tokens, tokens=>tokens.favoritess,{ primary:true, nullable:false,onDelete: 'CASCADE',onUpdate: 'NO ACTION' })
    @JoinColumn({ name:'TokenId'})
    token:tokens | null;

}
