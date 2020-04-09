import { createConnection, Connection } from 'typeorm'
import 'dotenv/config'

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<Connection> =>
      await createConnection({
        name: 'default',
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DB,
        synchronize: true,
        dropSchema: false,
        logging: true,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      }),
  },
]
