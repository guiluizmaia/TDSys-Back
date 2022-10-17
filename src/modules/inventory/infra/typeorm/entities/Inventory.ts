import { Properties } from "src/modules/properties/infra/typeorm/entities/Properties";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('inventory')
export class Inventory {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    product: string;
    @Column()
    client: string;
    @Column()
    propertyId: string;
    @ManyToOne((type) => Properties, property => property.inventories, {
        eager: true
    })
    @JoinColumn({name: "propertyId"})
    property: Properties
    @Column()
    qntdProduct: number;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}