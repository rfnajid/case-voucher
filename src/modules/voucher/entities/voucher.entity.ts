import { CustomerEntity } from 'src/modules/customer/entities/customer.entity';
import { BaseEntity, Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'vouchers' })
export class VoucherEntity extends BaseEntity {
  
  @PrimaryColumn()
  id: number;
  
  @Column()
  code: string;
  
  @Column()
  status: number;
  
  @Column()
  createdAt: Date;

  @Column()
  expiredAt: Date;

  @OneToOne(type => CustomerEntity, customer => customer.voucher)
  customer: CustomerEntity;

}
