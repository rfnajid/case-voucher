import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm"

export class init1669532207391 implements MigrationInterface {

    TABLE_CUSTOMERS = 'customers';
    TABLE_PURCHASE = 'purchase_transaction';
    TABLE_VOUCHERS = 'vouchers';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: this.TABLE_CUSTOMERS,
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isNullable: false,
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: "first_name",
                        type: "varchar",
                    },
                    {
                        name: "last_name",
                        type: "varchar",
                    },
                    {
                        name: "gender",
                        type: "varchar",
                    },
                    {
                        name: "date_of_birth",
                        type: "date",
                    },
                    {
                        name: "contact_number",
                        type: "varchar",
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    },
                ],
            }),
            true
        );

        await queryRunner.createIndex(
            this.TABLE_CUSTOMERS,
            new TableIndex({
                columnNames: ["email"],
            isUnique: true
            })
        );

        await queryRunner.createTable(
            new Table({
                name: this.TABLE_PURCHASE,
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isNullable: false,
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: "customer_id",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "total_spent",
                        isNullable: false,
                        type: "decimal(10,2)",
                    },
                    {
                        name: "total_saving",
                        isNullable: false,
                        type: "decimal(10,2)",
                    },
                    {
                        name: "transaction_at",
                        isNullable: false,
                        type: "timestamp",
                        default: "now()"
                    },
                ],
            }),
            true
        );

        await queryRunner.createForeignKey(
            this.TABLE_PURCHASE,
            new TableForeignKey({
                columnNames: ["customer_id"],
                referencedColumnNames: ["id"],
                referencedTableName: this.TABLE_CUSTOMERS,
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            }),
        );

        await queryRunner.createTable(
            new Table({
                name: this.TABLE_VOUCHERS,
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isNullable: false,
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: "customer_id",
                        type: "int",
                        isNullable: true,
                    },
                    {
                        name: "code",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "status",
                        isNullable: false,
                        type: "int",
                        default: 0
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        isNullable: false,
                        default: "now()"
                    },
                    {
                        name: "expired_at",
                        type: "timestamp",
                        isNullable: true,
                        default: "now()"
                    },
                ],
            }),
            true
        );

        await queryRunner.createForeignKey(
            this.TABLE_VOUCHERS,
            new TableForeignKey({
                columnNames: ["customer_id"],
                referencedColumnNames: ["id"],
                referencedTableName: this.TABLE_CUSTOMERS,
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            }),
        );

        await queryRunner.createIndex(
            this.TABLE_VOUCHERS,
            new TableIndex({
                columnNames: ["status","expired_at"],
            })
        );

        await queryRunner.createIndex(
            this.TABLE_VOUCHERS,
            new TableIndex({
                columnNames: ["code"],
                isUnique: true
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const tablePurchase = await queryRunner.getTable(this.TABLE_PURCHASE);
        const fkPurchase = tablePurchase.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("customer_id") !== -1,
        );

        const tableVouchers = await queryRunner.getTable(this.TABLE_VOUCHERS);
        const fkVouchers = tableVouchers.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("customer_id") !== -1,
        );
        
        await queryRunner.dropForeignKey(this.TABLE_PURCHASE, fkPurchase);
        await queryRunner.dropTable(this.TABLE_PURCHASE);
        await queryRunner.dropForeignKey(this.TABLE_VOUCHERS, fkVouchers);
        await queryRunner.dropTable(this.TABLE_VOUCHERS);
        await queryRunner.dropTable(this.TABLE_CUSTOMERS);
    }

}
