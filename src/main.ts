import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ApiConfigService } from './common/config/api-config.service'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ApiConfigService)
  app.setGlobalPrefix('api')
  await app.listen(configService.port)
}
bootstrap()
