import { createConnection, Connection } from 'typeorm'
import { Provider } from '@nestjs/common'
import { ApiConfigService } from '../common/config/api-config.service'

export const databaseProviders: Provider[] = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (
      apiConfigService: ApiConfigService,
    ): Promise<Connection> =>
      await createConnection({
        name: 'default',
        type: 'postgres',
        host: apiConfigService.databaseHost,
        port: apiConfigService.databasePort,
        username: apiConfigService.databaseUsername,
        password: apiConfigService.databasePassword,
        database: apiConfigService.databaseDB,
        synchronize: true,
        dropSchema: false,
        logging: true,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      }),
    inject: [ApiConfigService],
  },
]
