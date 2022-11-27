import { Controller, Get, Param, Post, Req, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import { Request } from 'express';
import { BasicResponseDTO } from "src/shared/dtos/basic-response.dto";
import {VoucherService} from './voucher.service';


@ApiTags('Vouchers')
@Controller()
export class VoucherController {

    constructor(private voucherService: VoucherService){

    }

    @Get()
    test(){
        return "testtt";
    }

    @Get('check/:customerId')
    async eligebleChecking(@Param('customerId') customerId: number) : Promise<BasicResponseDTO>{
        return await this.voucherService.isEligible(customerId);
    }

    @Post('validation')
    @UseInterceptors(FileInterceptor('file'))
    async submit(
      @Req() req: Request,
      @UploadedFiles() files: Express.Multer.File[],
    ) {
  
      return "photo validation";
    }
}