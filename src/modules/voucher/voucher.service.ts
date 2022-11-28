import { Injectable } from "@nestjs/common";
import * as moment from "moment";
import * as FormData from "form-data";
import { EnvConfigService } from "../../shared/config/env-config.service";
import { STATUS } from "../../shared/const/status.const";
import { BasicResponseDTO } from "../../shared/dtos/basic-response.dto";
import { DataSource, LessThan, LessThanOrEqual, MoreThan, Not, Repository } from "typeorm";
import { CustomerService } from "../customer/customer.service";
import { ValidationRequestDTO } from "./dtos/validation-request.dto";
import { VoucherEntity } from "./entities/voucher.entity";
import { PhotoValidationService } from "../../shared/http/photo-validation.service";

@Injectable()
export class VoucherService {

  private vRepo: Repository<VoucherEntity>;

  private voucherExpiration: number;

  constructor(
    dataSource: DataSource,
    private envConfigService: EnvConfigService,
    private customerService: CustomerService,
    private photoValidationService: PhotoValidationService
  ) {
    this.vRepo = dataSource.getRepository(VoucherEntity);
    this.voucherExpiration = this.envConfigService.getNumber('VOUCHER_EXPIRATION', 10);
  }

  /**
   * 
   * Get voucher by customer id and not expired yet
   * 
   * @param {number} customerId 
   * @returns {Promise<VoucherEntity}
   */
  private async getVoucherByCustomerIdAndNotExpiredYet(customerId: number): Promise<VoucherEntity> {
    return await this.vRepo.findOne({
      where: {
        customerId : customerId,
        status: Not(STATUS.FREE),
        expiredAt : MoreThan(moment().toDate())
      }
    });
  }


  /**
   * 
   * Check Voucher eligibility
   * 
   * @param {number} customerId 
   * @returns {Promise<boolean>}
   */
  public async isVoucherEligible(customerId: number): Promise<boolean> {
    
    const queryRes = await this.getVoucherByCustomerIdAndNotExpiredYet(customerId);

    return (!queryRes);
  }

  /**
   * 
   * Check customer & voucher eligibility
   * 
   * @param {number} customerId 
   * @returns {Promise<boolean>}
   */
  public async isAllEligible(customerId: number): Promise<boolean>{
    const customerEligible: boolean = await this.customerService.isEligible(customerId);
    
    const voucherEligible: boolean = await this.isVoucherEligible(customerId);

    return customerEligible && voucherEligible;
  }

  /**
   * 
   * Book and lock voucher for 10 minutes
   * 
   * @param {number} customerId 
   * @returns {Promise<BasicResponseDTO>}
   */
  public async bookVoucher(customerId: number): Promise<BasicResponseDTO>{

    if(!this.isAllEligible(customerId)){
      return new BasicResponseDTO(false, 'Customer is not eligible');
    }

    const voucher = await this.vRepo.findOne({
      where: [{
        status: LessThanOrEqual(1),
        expiredAt : LessThan(moment().toDate())
      }]
    });

    if(!voucher){
      return new BasicResponseDTO(false, 'Voucher is unavailable');
    }

    voucher.customerId = customerId;
    voucher.status = STATUS.BOOKED;
    voucher.expiredAt = moment().add(10,"minutes").toDate();

    const saveRes = await this.vRepo.save(voucher);

    return new BasicResponseDTO(saveRes ? true: false);
  }

  /**
   * 
   * Hit photo validation API and return voucher code if eligible
   * 
   * @param {ValidationRequestDTO} reqDTO 
   * @param {Express.Multer.File} file 
   * @returns {Promise<BasicResponseDTO>}
   */
  public async photoValidation(reqDTO: ValidationRequestDTO, file: Express.Multer.File): Promise<BasicResponseDTO>{


    const voucher = await this.vRepo.findOne({
      where: {
        customerId : reqDTO.id,
        status: STATUS.BOOKED,
        expiredAt : MoreThan(moment().toDate())
      }
    });
    
    if(!voucher){
      return new BasicResponseDTO(false, 'Voucher is unavailable');
    }

    const formData = new FormData();
    formData.append('file', Buffer.from(file.buffer), file.originalname);

    const apiRes: BasicResponseDTO = await this.photoValidationService.submit(formData);

    if(apiRes.success){
      
        voucher.status = STATUS.CLAIMED;
        voucher.customerId = reqDTO.id;

        this.vRepo.save(voucher);

        apiRes.success = true;
        apiRes.message = voucher.code;
    }

    return apiRes;
  }
}