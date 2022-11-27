import { Controller, Get, Param, Post, Req, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import { Request } from 'express';


@ApiTags('Vouchers')
@Controller()
export class VoucherController {
    constructor(){

    }

    @Get()
    test(){
        return "testtt";
    }

    @Get('check/:id')
    eligebleChecking(@Param('id') id: number){
        return 'eligble';
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