import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ROUTE } from 'src/route';
import { EnvConfigService } from 'src/shared/config/env-config.service';
import { SharedModule } from 'src/shared/shared.module';
import { VoucherModule } from '../voucher/voucher.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [

    // Routing
    RouterModule.register(ROUTE),
    
    // Type ORM
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      inject: [EnvConfigService],
      useFactory: (configService: EnvConfigService) =>
        configService.typeOrmConfig,
    }),

    // Other Modules
    SharedModule,
    VoucherModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
