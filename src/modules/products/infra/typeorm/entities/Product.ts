import { Provider } from "src/modules/providers/infra/typeorm/entities/Provider";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    name: string;
    @Column()
    uM: string;
    @Column()
    qntd: number;
    @Column()
    amount: number;
    @Column()
    providerId: string;
    @ManyToOne((type) => Provider, provider => provider.products, {
        eager: true
    })
    @JoinColumn({name: "providerId"})
    provider: Provider
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}