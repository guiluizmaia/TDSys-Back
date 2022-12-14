import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export interface IPhonesDtos {
    ddd: string;
    number: string;
}

@Entity('phones')
export class Phones {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    ddd: string;
    @Column()
    number: string;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}