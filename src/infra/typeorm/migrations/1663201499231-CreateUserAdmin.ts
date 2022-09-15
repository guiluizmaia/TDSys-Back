import CryptHash from "src/infra/utils/CryptHash/CryptHash";
import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUserAdmin1663201499231 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const crypt = new CryptHash();

        await queryRunner.query(`
            INSERT INTO users(id, name, email, password, "cpf", "active")
            VALUES (uuid_generate_v4(), 'admin', 'admin@admin.com', '${await crypt.create('admin')}', '44444444444', True);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM users
            WHERE name = 'admin';
        `)
    }

}
