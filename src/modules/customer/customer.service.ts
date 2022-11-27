import { Injectable } from "@nestjs/common";
import { EnvConfigService } from "src/shared/config/env-config.service";
import { DataSource, Repository } from "typeorm";
import { CustomerEntity } from "./entities/customer.entity";

@Injectable()
export class CustomerService {
  private customerRepo : Repository<CustomerEntity>;
  constructor(private dataSource: DataSource, private envConfigService: EnvConfigService) {
    this.customerRepo = dataSource.getRepository(CustomerEntity);
  }

  /**
   * 
   * Check if customer eligible for voucher claim.
   * 
   * @param {number} id 
   * @returns {Promise<boolean>}
   */
  public async isEligible(id: number): Promise<boolean>{

    const totalSpent = this.envConfigService.getNumber('ELIGIBLE_TOTAL_SPENT', 100);
    const intervalDay = this.envConfigService.getNumber('ELIGIBLE_INTERVAL_DAY', 30);
    const minTrx = this.envConfigService.getNumber('ELIGIBLE_MIN_TRX_IN_INTERVAL', 3);

    const queryRes = (await this.dataSource.query(`call GetEligible(${id},${totalSpent},${intervalDay},${minTrx})`))[0];
    console.log('get eligible : '+ id);

    console.log(`customer is eligible`, queryRes);

    return queryRes[0] ? true: false;
  }
}