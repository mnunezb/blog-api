import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  ConflictException,
  Inject,
} from '@nestjs/common'
import { LoginDTO, RegisterDTO } from './models/user.dto'
import { UserEntity } from './entities/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
  ) {}

  async register(credentials: RegisterDTO): Promise<UserEntity> {
    try {
      const user = this.userRepository.create(credentials)
      await user.save()
      return user
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Username has already been taken')
      }
      throw new InternalServerErrorException()
    }
  }

  async login({ email, password }: LoginDTO): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOne({ where: { email } })
      const isValid = await user.comparePassword(password)
      if (!isValid) {
        throw new UnauthorizedException('Invalid credentials')
      }
      return user
    } catch (err) {
      throw new UnauthorizedException('Invalid credentials')
    }
  }

  async list(): Promise<UserEntity[]> {
    return this.userRepository.find()
  }

  async retrieve(id: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id } })
  }
}
