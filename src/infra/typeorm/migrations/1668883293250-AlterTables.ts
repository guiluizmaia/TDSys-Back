import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterTables1668883293250 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('talhao', 
        [                        
            new TableColumn({
                name: 'active',
                type: 'boolean',
                default: true
            })
        ]
        )
        await queryRunner.addColumns('property', 
        [                        
            new TableColumn({
                name: 'active',
                type: 'boolean',
                default: true
            })
        ]
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('talhao', ['active'])
        await queryRunner.dropColumns('property', ['active'])

    }

}
