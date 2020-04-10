import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  /* SERVER */
  get port(): number {
    return this.configService.get<number>('PORT', 3000)
  }

  /* DATABASE */
  get databaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST', '127.0.0.1')
  }
  get databasePort(): number {
    return this.configService.get<number>('DATABASE_PORT', 5432)
  }
  get databaseUsername(): string {
    return this.configService.get<string>('DATABASE_USER', 'postgres')
  }
  get databasePassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD', 'postgres')
  }
  get databaseDB(): string {
    return this.configService.get<string>('DATABASE_DB', 'postgres')
  }
}
