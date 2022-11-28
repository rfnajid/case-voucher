import { Module } from "@nestjs/common";
import { SharedModule } from "../../shared/shared.module";
import { CustomerModule } from "../customer/customer.module";
import { VoucherController } from "./voucher.controller";
import { VoucherService } from "./voucher.service";

@Module({
    imports: [SharedModule, CustomerModule],
    controllers: [VoucherController],
    providers: [VoucherService],
    exports: [VoucherService],
  })
  export class VoucherModule {}