import { Phones } from "src/modules/commonData/infra/typeorm/entities/Phones";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('users')
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    name: string;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column()
    cpf: string;
    @Column()
    active: boolean;
    @ManyToMany((type) => Phones, {
        cascade: true,
        eager: true
    })
    @JoinTable({
        name: "users_phones",
        joinColumn: { name: "userId", referencedColumnName: "id"},
        inverseJoinColumn: { name: "phoneId" }
    })
    phones: Phones;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}