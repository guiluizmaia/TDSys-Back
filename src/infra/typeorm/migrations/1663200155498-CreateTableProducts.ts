import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTableProducts1663200155498 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.query(`
            SELECT table_name 
            FROM information_schema.tables
            WHERE table_name='products'    
        `);

        if(tableExists.length === 0){
            await queryRunner.createTable(
                new Table({
                    name: "products",
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
                            name: 'uM',
                            type: 'varchar(100)',
                        },
                        {
                            name: 'qntd',
                            type: 'decimal',
                        },
                        {
                            name: 'amount',
                            type: 'decimal',
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
                            name: 'providerProductsFK',
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
        await queryRunner.dropTable('products');
    }
}
