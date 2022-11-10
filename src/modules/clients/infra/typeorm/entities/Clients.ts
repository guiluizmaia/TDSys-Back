import { Properties } from "src/modules/properties/infra/typeorm/entities/Properties";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('clients')
export class Clients {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    name: string;
    @Column()
    cnpj: string;
    @Column()
    insc_state: string;
    @Column()
    active: boolean;
    @Column()
    email: string;
    @OneToMany((type) => Properties, client => Properties)
    properties?: Promise<Properties[]>;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}