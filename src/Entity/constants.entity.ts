import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from "typeorm";


@Entity("constants")
export class Constant {

    @Column("varchar", {
        nullable: false,
        primary: true,
        length: 64,
        name: "Id"
    })
    Id: string;


    @Column("varchar", {
        nullable: true,
        length: 64,
        name: "Value"
    })
    Value: string | null;

}
