import { AppModule } from "./modules/app/app.module";
import { VoucherModule } from "./modules/voucher/voucher.module";

export const ROUTE = [
    {
      path: '',
      module: AppModule,
      children: [
        {
          path: 'vouchers',
          module: VoucherModule,
        }
      ],
    },
  ];