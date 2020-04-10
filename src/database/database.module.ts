import { Module } from '@nestjs/common'
import { databaseProviders } from './database.providers'
import { ApiConfigService } from '../common/config/api-config.service'

@Module({
  providers: [...databaseProviders, ApiConfigService],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
