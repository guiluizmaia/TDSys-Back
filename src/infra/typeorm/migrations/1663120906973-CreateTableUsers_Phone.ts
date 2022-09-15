import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTableUsersPhone1663120906973 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.query(`
            SELECT table_name 
            FROM information_schema.tables
            WHERE table_name='users_phones'    
        `);

        if(tableExists.length === 0){
            await queryRunner.createTable(
                new Table({
                    name: "users_phones",
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
                            name: 'userId',
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
                            name: 'phonesUsersFK',
                            columnNames: ['phoneId'],
                            referencedColumnNames: ['id'],
                            referencedTableName: 'phones'
                        }),
                        new TableForeignKey({
                            name: 'UsersPhonesFK',
                            columnNames: ['userId'],
                            referencedColumnNames: ['id'],
                            referencedTableName: 'users'
                        })
                    ]
                })
            )
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users_phones');
    }
}
