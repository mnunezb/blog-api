import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { authProviders } from './auth.providers'
import { DatabaseModule } from '../database/database.module'

@Module({
  providers: [...authProviders, AuthService],
  controllers: [AuthController],
  imports: [DatabaseModule],
})
export class AuthModule {}
