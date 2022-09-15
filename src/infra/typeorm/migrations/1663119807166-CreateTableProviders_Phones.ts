import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTableProvidersPhones1663119807166 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.query(`
            SELECT table_name 
            FROM information_schema.tables
            WHERE table_name='providers_phones'    
        `);

        if(tableExists.length === 0){
            await queryRunner.createTable(
                new Table({
                    name: "providers_phones",
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
                            name: 'providerId',
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
                            name: 'phonesProvidersFK',
                            columnNames: ['phoneId'],
                            referencedColumnNames: ['id'],
                            referencedTableName: 'phones'
                        }),
                        new TableForeignKey({
                            name: 'providersPhonesFK',
                            columnNames: ['providerId'],
                            referencedColumnNames: ['id'],
                            referencedTableName: 'providers'
                        })
                    ]
                })
            )
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('providers_phones');
    }

}
