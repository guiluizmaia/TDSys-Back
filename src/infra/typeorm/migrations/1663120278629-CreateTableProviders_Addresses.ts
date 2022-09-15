import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTableProvidersAddresses1663120278629 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.query(`
            SELECT table_name 
            FROM information_schema.tables
            WHERE table_name='providers_addresses'    
        `);

        if(tableExists.length === 0){
            await queryRunner.createTable(
                new Table({
                    name: "providers_addresses",
                    columns: [
                        {
                            name: 'id',
                            type: 'uuid',
                            generationStrategy: 'uuid',
                            isPrimary: true,
                            default: `uuid_generate_v4()`
                        },
                        {
                            name: 'addressId',
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
                            name: 'addressesProvidersFK',
                            columnNames: ['addressId'],
                            referencedColumnNames: ['id'],
                            referencedTableName: 'addresses'
                        }),
                        new TableForeignKey({
                            name: 'providersAddressesFK',
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
        await queryRunner.dropTable('providers_addresses');
    }
}
