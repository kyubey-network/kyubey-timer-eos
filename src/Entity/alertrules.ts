import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { Token } from "./tokens.entity";
import { alertlogs } from "./alertlogs";


@Entity("alertrules", { schema: "dex_stage" })
@Index("IX_AlertRules_TokenId", ["token",])
export class alertrules {

    @PrimaryGeneratedColumn({
        type: "bigint",
        name: "Id"
    })
    Id: string;



    @ManyToOne(type => Token, tokens => tokens.alertruless, { onDelete: 'NO ACTION', onUpdate: 'RESTRICT' })
    @JoinColumn({ name: 'TokenId' })
    token: Token | null;


    @Column("int", {
        nullable: false,
        name: "Shard"
    })
    Shard: number;


    @Column("int", {
        nullable: false,
        name: "Type"
    })
    Type: number;


    @Column("int", {
        nullable: false,
        name: "Interval"
    })
    Interval: number;


    @Column("int", {
        nullable: false,
        name: "HealthState"
    })
    HealthState: number;


    @Column("longtext", {
        nullable: true,
        name: "RunnerJavascript"
    })
    RunnerJavascript: string | null;



    @OneToMany(type => alertlogs, alertlogs => alertlogs.alertRule, { onDelete: 'CASCADE', onUpdate: 'RESTRICT' })
    alertlogss: alertlogs[];

}
