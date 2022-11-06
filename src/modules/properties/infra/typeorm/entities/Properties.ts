import { Clients } from "src/modules/clients/infra/typeorm/entities/Clients";
import { Addresses } from "src/modules/commonData/infra/typeorm/entities/Addresses";
import { Inventory } from "src/modules/inventory/infra/typeorm/entities/Inventory";
import { Talhao } from "src/modules/talhao/infra/typeorm/entities/Talhao";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
    @OneToMany((type) => Talhao, property => Talhao, { onDelete: 'CASCADE'})
    talhao: Promise<Talhao[]>;
    @ManyToMany((type) => Addresses, {
        cascade: true,
        eager: true
    })
    @JoinTable({
        name: "property_addresses",
        joinColumn: { name: "propertyId", referencedColumnName: "id"},
        inverseJoinColumn: { name: "addressId" },
    })
    addresses: Addresses;
    @OneToMany((type) => Inventory, property => Inventory, { onDelete: 'CASCADE'})
    inventories: Promise<Inventory[]>;
    @Column()
    name: string;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}