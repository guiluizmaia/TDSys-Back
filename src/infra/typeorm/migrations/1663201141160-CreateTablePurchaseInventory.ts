import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTablePurchaseInventory1663201141160 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.query(`
        SELECT table_name 
        FROM information_schema.tables
        WHERE table_name='purchase_inventory'    
    `);

    if(tableExists.length === 0){
        await queryRunner.createTable(
            new Table({
                name: "purchase_inventory",
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        generationStrategy: 'uuid',
                        isPrimary: true,
                        default: `uuid_generate_v4()`
                    },
                    {
                        name: 'purchaseId',
                        type: 'uuid',
                    },
                    {
                        name: 'inventoryId',
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
                        name: 'purchaseInventoryFK',
                        columnNames: ['purchaseId'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'purchase'
                    }),
                    new TableForeignKey({
                        name: 'InventoryPurchaseFK',
                        columnNames: ['inventoryId'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'products'
                    })
                ]
            })
        )
    }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('purchase_inventory');
    }
}
