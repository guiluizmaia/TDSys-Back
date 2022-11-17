import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableProviders1663118769619 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.query(`
        SELECT table_name 
        FROM information_schema.tables
        WHERE table_name='providers'    
    `);

    if(tableExists.length === 0){
        await queryRunner.createTable(
            new Table({
                name: "providers",
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
                        name: 'cnpj',
                        type: 'varchar(14)',
                    },
                    {
                        name: 'active',
                        type: 'boolean',
                    },
                    {
                        name: 'email',
                        type: 'varchar(50)',
                    },
                    {
                        name: 'insc_state',
                        type: 'varchar(255)',
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
        await queryRunner.dropTable('providers');
    }

}
