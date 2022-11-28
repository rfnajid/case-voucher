import { Test, TestingModule } from "@nestjs/testing";
import { SharedModule } from "../../shared/shared.module";
import { EnvConfigService } from "../../shared/config/env-config.service";
import { DataSource } from "typeorm";
import { CustomerService } from "./customer.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dataSourceMockFactory } from "../../shared/test/mock-datasource";
import { CustomerEntity } from "./entities/customer.entity";

describe('Customer Service', () => {
    let customerService: CustomerService;
    let dataSource: DataSource;
    let envConfigService: EnvConfigService;
  
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CustomerService,
                { provide: DataSource, useFactory: dataSourceMockFactory }],
            imports: [SharedModule, TypeOrmModule],
          }).compile();

          envConfigService = module.get<EnvConfigService>(EnvConfigService);
          dataSource = module.get<DataSource>(DataSource);
          customerService = new CustomerService(dataSource, envConfigService);
    });
  
    describe('check customer eligibility', () => {
      it('case fail', async () => {
        const mockQueryRes = [];
        const expectedRes = false;
        
        jest.spyOn(dataSource, 'query').mockImplementation(() => Promise.resolve([mockQueryRes]));
  
        expect(await customerService.isEligible(0)).toEqual(expectedRes);
      });

      it('case success', async () => {
        const mockQueryRes = [new CustomerEntity()];
        const expectedRes = true;
        
        jest.spyOn(dataSource, 'query').mockImplementation(() => Promise.resolve([mockQueryRes]));
  
        expect(await customerService.isEligible(0)).toEqual(expectedRes);
      });
    });
  });