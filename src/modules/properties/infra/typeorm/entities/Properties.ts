import { Clients } from "src/modules/clients/infra/typeorm/entities/Clients";
import { Inventory } from "src/modules/inventory/infra/typeorm/entities/Inventory";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('property')
export class Properties {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    clientId: string;
    @ManyToOne((type) => Clients, clients => clients.properties, {
        eager: true
    })
    @JoinColumn({name: "clientId"})
    client: Clients;
    @OneToMany((type) => Inventory, property => Inventory)
    inventories: Promise<Inventory[]>;
    @Column()
    name: string;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}