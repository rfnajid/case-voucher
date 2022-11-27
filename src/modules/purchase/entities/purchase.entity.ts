import { CustomerEntity } from 'src/modules/customer/entities/customer.entity';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'purchase_transaction' })
export class PurchaseEntity extends BaseEntity {
  
  @PrimaryColumn()
  id: number;
  
  @Column()
  totalSpent: number;
  
  @Column()
  totalSaving: number;
  
  @Column()
  transactionAt: Date;

  @ManyToOne(type => CustomerEntity, customer => customer.purchases)
  customer: CustomerEntity;

}
