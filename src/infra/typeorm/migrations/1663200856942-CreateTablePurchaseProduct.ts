import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTablePurchaseProduct1663200856942 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.query(`
        SELECT table_name 
        FROM information_schema.tables
        WHERE table_name='purchase_product'    
    `);

    if(tableExists.length === 0){
        await queryRunner.createTable(
            new Table({
                name: "purchase_product",
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
                        name: 'productId',
                        type: 'uuid',
                    },                    
                    {
                        name: 'qntd',
                        type: 'integer',
                    },                    
                    {
                        name: 'price',
                        type: 'decimal',
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
                        name: 'purchaseProductsFK',
                        columnNames: ['purchaseId'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'purchase'
                    }),
                    new TableForeignKey({
                        name: 'productsPurchaseFK',
                        columnNames: ['productId'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'products'
                    })
                ]
            })
        )
    }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('purchase_product');
    }
}
