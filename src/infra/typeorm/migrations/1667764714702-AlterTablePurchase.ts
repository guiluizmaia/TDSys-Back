import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterTablePurchase1667764714702 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('purchase', 
        [                        
            new TableColumn({
                name: 'propertyId',
                type: 'varchar',
                isNullable: true
            }),
        ]
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('purchase', ['propertyId'])

    }

}
