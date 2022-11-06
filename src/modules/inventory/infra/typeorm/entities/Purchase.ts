import { Properties } from "src/modules/properties/infra/typeorm/entities/Properties";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('purchase')
export class Purchase {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    propertyId: string;
    @Column()
    amount: Number;
    @Column()
    date: Date;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}

@Entity('purchase_product')
export class Purchase_product {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    purchaseId: string;
    @Column()
    productId: string;
    @Column()
    qntd: Number;
    @Column()
    price: Number;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}