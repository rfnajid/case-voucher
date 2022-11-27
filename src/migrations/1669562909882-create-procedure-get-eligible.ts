import { MigrationInterface, QueryRunner } from "typeorm"

export class createProcedureGetEligble1669562909882 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await this.down(queryRunner);
        await queryRunner.query(
            `CREATE PROCEDURE GetEligible(CUSTOMER_ID int, MIN_TOTAL_SPENT decimal(10,2), INTERVAL_DAY int, MIN_TRX_IN_INTERVAL int)
            BEGIN
            select c.* from customers c
            inner join purchase_transaction ptot 
                on ptot.customer_id = c.id
            inner join purchase_transaction pco 
                on pco.customer_id = c.id and pco.transaction_at BETWEEN CURRENT_TIMESTAMP() - INTERVAL INTERVAL_DAY DAY AND CURRENT_TIMESTAMP()
            where c.id = CUSTOMER_ID
            GROUP by c.id
            having sum(ptot.total_spent) >= MIN_TOTAL_SPENT and count(pco.id) >= MIN_TRX_IN_INTERVAL;
            END;`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('drop procedure if exists GetEligible');
    }

}
