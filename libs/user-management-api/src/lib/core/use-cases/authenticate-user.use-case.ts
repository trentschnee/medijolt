// libs/user-management-api/src/core/use-cases/authenticate-user.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from '../domain/repositories/user.repository';

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) { }

  async execute(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }
}
