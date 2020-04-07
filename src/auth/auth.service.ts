import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { RegisterDto, LoginDto } from '../models/user.dto'

@Injectable()
export class AuthService {
  private mockUser = {
    email: 'jake@jake.jake',
    token: 'jwt.token.here',
    username: 'jake',
    bio: 'I work at statefarm',
    image: null,
  }

  register(credentials: RegisterDto) {
    return this.mockUser
  }

  login(credentials: LoginDto) {
    if (credentials.email === this.mockUser.email) {
      return this.mockUser
    }
    throw new InternalServerErrorException()
  }
}
