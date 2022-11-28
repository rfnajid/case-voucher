import {  Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvConfigService } from './config/env-config.service';
import { PhotoValidationService } from './http/photo-validation.service';

@Global()
@Module({
  imports: [],
  providers: [EnvConfigService, ConfigService, PhotoValidationService],
  exports: [EnvConfigService, PhotoValidationService],
})
export class SharedModule {}
