import { Connection, Repository } from 'typeorm'
import { UserEntity } from './entities/user.entity'

export const authProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (connection: Connection): Repository<UserEntity> =>
      connection.getRepository(UserEntity),
    inject: ['DATABASE_CONNECTION'],
  },
]
