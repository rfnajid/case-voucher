import { Injectable } from "@nestjs/common";
import { EnvConfigService } from "src/shared/config/env-config.service";
import { BasicResponseDTO } from "src/shared/dtos/basic-response.dto";
import { DataSource, Repository } from "typeorm";
import { VoucherEntity } from "./entities/voucher.entity";

@Injectable()
export class VoucherService {

  private vRepo: Repository<VoucherEntity>;

  constructor(
    private dataSource: DataSource,
    private envConfigService: EnvConfigService
  ) {
    this.vRepo = dataSource.getRepository(VoucherEntity);
  }

  public async isEligible(id: number): Promise<BasicResponseDTO>{

    const res: BasicResponseDTO = new BasicResponseDTO();

    const totalSpent = this.envConfigService.getNumber('ELIGIBLE_TOTAL_SPENT', 100);
    const intervalDay = this.envConfigService.getNumber('ELIGIBLE_INTERVAL_DAY', 30);
    const minTrx = this.envConfigService.getNumber('ELIGIBLE_MIN_TRX_IN_INTERVAL', 3);

    const queryRes: unknown[] = await this.dataSource.query(`call GetEligible(${id},${totalSpent},${intervalDay},${minTrx})`)[0];

    res.success = queryRes.length>0;

    return res;
  }
}