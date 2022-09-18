import { Addresses } from "src/modules/commonData/infra/typeorm/entities/Addresses";
import { Phones } from "src/modules/commonData/infra/typeorm/entities/Phones";
import { Product } from "src/modules/products/infra/typeorm/entities/Product";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('providers')
export class Provider {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    name: string;
    @Column()
    cnpj: string;  
    @Column()
    active: boolean;
    @Column()
    email: string;  
    @Column()
    insc_state: string;
    @ManyToMany((type) => Phones, {
        cascade: true,
        eager: true
    })
    @JoinTable({
        name: "providers_phones",
        joinColumn: { name: "providerId", referencedColumnName: "id"},
        inverseJoinColumn: { name: "phoneId" }
    })
    phones: Phones;
    @ManyToMany((type) => Addresses, {
        cascade: true,
        eager: true
    })
    @JoinTable({
        name: "providers_addresses",
        joinColumn: { name: "providerId", referencedColumnName: "id"},
        inverseJoinColumn: { name: "addressId" }
    })
    addresses: Addresses;
    @OneToMany((type) => Product, provider => Product)
    products: Promise<Product[]>;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}