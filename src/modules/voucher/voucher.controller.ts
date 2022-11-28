import { Body, Controller, Get, Param, Post, Req, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { Request } from 'express';
import { BasicResponseDTO } from "src/shared/dtos/basic-response.dto";
import { ValidationRequestDTO } from "./dtos/validation-request.dto";
import {VoucherService} from './voucher.service';


@ApiTags('Vouchers')
@Controller()
export class VoucherController {

    constructor(
      private voucherService: VoucherService
    ){}

    @Get('book/:customerId')
    async bookVoucher(@Param('customerId') customerId: number) : Promise<BasicResponseDTO>{
        return await this.voucherService.bookVoucher(customerId);
    }

    @Post('validation')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file'))
    async submit(
      @Req() req: Request,
      @UploadedFile() file: Express.Multer.File,
      @Body() requestDTO : ValidationRequestDTO
    ): Promise<BasicResponseDTO>{
    
      return await this.voucherService.photoValidation(requestDTO, file);
    }
}