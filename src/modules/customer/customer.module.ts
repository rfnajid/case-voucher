import { Module } from "@nestjs/common";
import { PurchaseModule } from "../purchase/purchase.module";
import { CustomerService } from "./customer.service";

@Module({
    imports: [PurchaseModule],
    providers: [CustomerService],
    exports: [CustomerService],
  })
  export class CustomerModule {}