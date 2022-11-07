import { Properties } from "src/modules/properties/infra/typeorm/entities/Properties";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('application')
export class Application {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    productId: string;
    @Column()
    qntd: Number;
    @Column()
    talhaoId: Number;
    @Column()
    applicationDate: Date;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}
