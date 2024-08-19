// libs/medijolt-emar-api/src/interfaces/controllers/auth.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticateUserUseCase } from '../../core/use-cases/authenticate-user.use-case';
import { RegisterUserUseCase } from '../../core/use-cases/register-user.use-case';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly authenticateUserUseCase: AuthenticateUserUseCase,
  ) { }

  @Post('register')
  async register(@Body() createUserDto: { email: string, password: string }) {
    return this.registerUserUseCase.execute(createUserDto.email, createUserDto.password);
  }

  @Post('login')
  async login(@Body() loginUserDto: { email: string, password: string }) {
    return this.authenticateUserUseCase.execute(loginUserDto.email, loginUserDto.password);
  }
}
