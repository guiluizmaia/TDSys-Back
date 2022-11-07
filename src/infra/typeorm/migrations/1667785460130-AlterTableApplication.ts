import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterTableApplication1667785460130 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "application" RENAME COLUMN "product" TO "productId"
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "application" RENAME COLUMN "productId" TO "product"
        `)
    }

}
