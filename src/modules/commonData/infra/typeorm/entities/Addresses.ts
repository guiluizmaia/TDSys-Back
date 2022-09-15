import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('addresses')
export class Addresses {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    street: string;
    @Column()
    city: string;
    @Column()
    number: number;
    @Column()
    zipCode: string;
    @Column()
    state: string;
    @Column()
    district: string;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}