import { Inject, Injectable } from "@nestjs/common";
import { v4 as uuid } from 'uuid'; // UUID library for generating unique IDs
import { User } from "../domain/entities/user.entity";
import { UserRepository } from "../domain/repositories/user.repository";

import * as bcrypt from 'bcryptjs';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) { }
  async execute(email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User(uuid(), email, hashedPassword, true);
    return this.userRepository.save(user);
  }
}
