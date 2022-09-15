import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTableApplication1663122045628 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.query(`
            SELECT table_name 
            FROM information_schema.tables
            WHERE table_name='application'    
        `);

        if(tableExists.length === 0){
            await queryRunner.createTable(
                new Table({
                    name: "application",
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
                            name: 'qntd',
                            type: 'integer',
                        },
                        {
                            name: 'talhaoId',
                            type: 'uuid',
                        },
                        {
                            name: 'applicationDate',
                            type: 'timestamp',
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
                            name: 'talhaoApplicationFK',
                            columnNames: ['talhaoId'],
                            referencedColumnNames: ['id'],
                            referencedTableName: 'talhao'
                        })
                    ]
                })
            )
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('application');
    }
}
