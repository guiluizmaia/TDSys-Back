import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTableInventory1663199935654 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.query(`
            SELECT table_name 
            FROM information_schema.tables
            WHERE table_name='inventory'    
        `);

        if(tableExists.length === 0){
            await queryRunner.createTable(
                new Table({
                    name: "inventory",
                    columns: [
                        {
                            name: 'id',
                            type: 'uuid',
                            generationStrategy: 'uuid',
                            isPrimary: true,
                            default: `uuid_generate_v4()`
                        },
                        {
                            name: 'product',
                            type: 'varchar(100)',
                        },
                        {
                            name: 'client',
                            type: 'varchar(100)',
                        },
                        {
                            name: 'propertyId',
                            type: 'uuid',
                        },
                        {
                            name: 'qntdProduct',
                            type: 'integer',
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
                            name: 'propertyInventoryFK',
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
        await queryRunner.dropTable('inventory');
    }
}
