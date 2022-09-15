import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTablePropertyAddresses1663121451803 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.query(`
            SELECT table_name 
            FROM information_schema.tables
            WHERE table_name='property_addresses'    
        `);

        if(tableExists.length === 0){
            await queryRunner.createTable(
                new Table({
                    name: "property_addresses",
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
                            name: 'propertyId',
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
                            name: 'addressesPropertyFK',
                            columnNames: ['addressId'],
                            referencedColumnNames: ['id'],
                            referencedTableName: 'addresses'
                        }),
                        new TableForeignKey({
                            name: 'propertyAddressesFK',
                            columnNames: ['propertyId'],
                            referencedColumnNames: ['id'],
                            referencedTableName: 'property'
                        })
                    ]
                })
            )
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('property_addresses');
    }
}
