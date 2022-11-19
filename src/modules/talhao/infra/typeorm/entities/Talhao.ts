import { Properties } from "src/modules/properties/infra/typeorm/entities/Properties";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('talhao')
export class Talhao {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    name: string;
    @Column()
    propertyId: string;
    @Column()
    active: boolean;
    @ManyToOne((type) => Properties, property => property.inventories, {
        eager: true
    })
    @JoinColumn({name: "propertyId"})
    property?: Properties;   
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}