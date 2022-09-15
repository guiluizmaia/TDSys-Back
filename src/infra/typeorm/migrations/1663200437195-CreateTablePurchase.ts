import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTablePurchase1663200437195 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.query(`
        SELECT table_name 
        FROM information_schema.tables
        WHERE table_name='purchase'    
    `);

    if(tableExists.length === 0){
        await queryRunner.createTable(
            new Table({
                name: "purchase",
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        generationStrategy: 'uuid',
                        isPrimary: true,
                        default: `uuid_generate_v4()`
                    },
                    {
                        name: 'name',
                        type: 'varchar(100)',
                    },
                    {
                        name: 'amount',
                        type: 'decimal',
                    },
                    {
                        name: 'date',
                        type: 'timestamp',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    }
                ]
            })
        )
    }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('purchase');
    }
}
