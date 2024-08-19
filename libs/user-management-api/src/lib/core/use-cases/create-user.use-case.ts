import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid'; // UUID library for generating unique IDs
import { CreateUserDto } from '../../interfaces/dtos/create-user.dto';
import { User } from '../domain/entities/user.entity';
import { UserRepository } from '../domain/repositories/user.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) { }

  async execute(createUserDto: CreateUserDto): Promise<User> {
    const user = new User(
      uuid(),                   // Generate a unique ID
      createUserDto.email,
      createUserDto.password,
      true                      // Set isEnabled to true by default
    );

    return this.userRepository.save(user);
  }
}
