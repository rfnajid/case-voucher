import {  Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvConfigService } from './config/env-config.service';

@Global()
@Module({
  imports: [],
  providers: [EnvConfigService, ConfigService],
  exports: [EnvConfigService],
})
export class SharedModule {}
