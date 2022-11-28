import { CustomerEntity } from '../../../../src/modules/customer/entities/customer.entity';
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'vouchers' })
export class VoucherEntity extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;
  
  @Column()
  customerId: number;
  
  @Column()
  status: number;
  
  @Column()
  createdAt: Date;

  @Column()
  expiredAt: Date;

  @OneToOne(type => CustomerEntity, customer => customer.voucher)
  @JoinColumn()
  customer: CustomerEntity;

}
