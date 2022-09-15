import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableAddresses1663119416035 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.query(`
        SELECT table_name 
        FROM information_schema.tables
        WHERE table_name='addresses'    
    `);

    if(tableExists.length === 0){
        await queryRunner.createTable(
            new Table({
                name: "addresses",
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        generationStrategy: 'uuid',
                        isPrimary: true,
                        default: `uuid_generate_v4()`
                    },
                    {
                        name: 'street',
                        type: 'varchar(100)',
                    },
                    {
                        name: 'city',
                        type: 'varchar(100)',
                    },
                    {
                        name: 'number',
                        type: 'varchar(15)',
                    },
                    {
                        name: 'zipCode',
                        type: 'varchar(10)',
                    },
                    {
                        name: 'state',
                        type: 'varchar(100)',
                    },
                    {
                        name: 'district',
                        type: 'varchar(100)',
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
        await queryRunner.dropTable('addresses');
    }

}
