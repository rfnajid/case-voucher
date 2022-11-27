import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { SnakeNamingStrategy } from '../stategy/snake-naming.strategy';

@Injectable()
export class EnvConfigService {
  constructor(private configService: ConfigService) {}

  get isDevelopment(): boolean {
    return this.nodeEnv === 'dev';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'prod';
  }

  public getNumber(key: string, defaultValue?: number): number {
    const value = this.configService.get(key, defaultValue);
    if (value === undefined) {
      throw new Error(key + ' env var not set'); // probably we should call process.exit() too to avoid locking the service
    }
    try {
      return Number(value);
    } catch {
      throw new Error(key + ' env var is not a number');
    }
  }

  public getBoolean(key: string, defaultValue?: boolean): boolean {
    const value = this.configService.get(key, defaultValue?.toString());
    if (value === undefined) {
      throw new Error(key + ' env var not set');
    }
    try {
      return Boolean(JSON.parse(value));
    } catch {
      throw new Error(key + ' env var is not a boolean');
    }
  }

  public getString(key: string, defaultValue?: string): string {
    const value = this.configService.get(key, defaultValue);

    if (!value) {
      console.warn(`"${key}" environment variable is not set`);
      return;
    }
    return value.toString().replace(/\\n/g, '\n');
  }

  get nodeEnv(): string {
    return this.getString('NODE_ENV', 'development');
  }

  get fallbackLanguage(): string {
    return this.getString('FALLBACK_LANGUAGE').toLowerCase();
  }

  get typeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: this.getString('TYPEORM_CONNECTION'),
      host: this.getString('TYPEORM_HOST'),
      port: this.getNumber('TYPEORM_PORT'),
      username: this.getString('TYPEORM_USERNAME'),
      password: this.getString('TYPEORM_PASSWORD'),
      database: this.getString('TYPEORM_DATABASE'),
      entities: [__dirname + '/../../modules/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
      keepConnectionAlive: true,
      bigNumberStrings: false,
      migrationsRun: this.getBoolean('TYPEORM_MIGRATIONS_RUN'),
      logging: this.getBoolean(
        'ENABLE_ORMLOGS',
        this.getBoolean('TYPEORM_LOGGING'),
      ),
      namingStrategy: new SnakeNamingStrategy(),
    } as TypeOrmModuleAsyncOptions;
  }

  get documentationEnabled(): boolean {
    return this.getBoolean('ENABLE_DOCUMENTATION', this.isDevelopment);
  }
}
