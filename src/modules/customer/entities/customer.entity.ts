import { VoucherEntity } from "../../../../src/modules/voucher/entities/voucher.entity";
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'customers' })
export class CustomerEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  gender: string;

  @Column()
  dateOfBirth: string;

  @Column()
  contactNumber: string;

  @Column()
  email: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @OneToOne(type => VoucherEntity, voucher => voucher.customer)
  @JoinColumn()
  voucher: VoucherEntity;
}