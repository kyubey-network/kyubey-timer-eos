import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { Token } from "./tokens.entity";


@Entity("favorites")
@Index("TokenId", ["Token",])
export class Favorite {

    @Column("varchar", {
        nullable: false,
        primary: true,
        length: 16,
        name: "Account"
    })
    Account: string;



    @ManyToOne(type => Token, tokens => tokens.favoritess, { primary: true, nullable: false, onDelete: 'CASCADE', onUpdate: 'NO ACTION' })
    @JoinColumn({ name: 'TokenId' })
    Token: Token | null;

}
