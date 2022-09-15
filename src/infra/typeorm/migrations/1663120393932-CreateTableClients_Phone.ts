import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTableClientsPhone1663120393932 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.query(`
            SELECT table_name 
            FROM information_schema.tables
            WHERE table_name='clients_phones'    
        `);

        if(tableExists.length === 0){
            await queryRunner.createTable(
                new Table({
                    name: "clients_phones",
                    columns: [
                        {
                            name: 'id',
                            type: 'uuid',
                            generationStrategy: 'uuid',
                            isPrimary: true,
                            default: `uuid_generate_v4()`
                        },
                        {
                            name: 'phoneId',
                            type: 'uuid',
                        },
                        {
                            name: 'clientId',
                            type: 'uuid',
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
                    ],
                    foreignKeys: [
                        new TableForeignKey({
                            name: 'phonesClientsFK',
                            columnNames: ['phoneId'],
                            referencedColumnNames: ['id'],
                            referencedTableName: 'phones'
                        }),
                        new TableForeignKey({
                            name: 'clientsPhonesFK',
                            columnNames: ['clientId'],
                            referencedColumnNames: ['id'],
                            referencedTableName: 'clients'
                        })
                    ]
                })
            )
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('clients_phones');
    }
}
