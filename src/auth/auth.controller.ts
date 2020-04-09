import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  Param,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterDTO, LoginDTO } from './models/user.dto'
import { UserEntity } from './entities/user.entity'

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  register(@Body(ValidationPipe) body: RegisterDTO): Promise<LoginDTO> {
    return this.authService.register(body)
  }

  @Post('login')
  login(@Body(ValidationPipe) body: LoginDTO): Promise<UserEntity> {
    return this.authService.login(body)
  }

  @Get()
  async list(): Promise<UserEntity[]> {
    return this.authService.list()
  }

  @Get(':id')
  async retrieve(@Param('id') param: string): Promise<UserEntity> {
    return this.authService.retrieve(param)
  }
}
