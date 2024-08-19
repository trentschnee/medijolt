import { Inject, Injectable } from '@nestjs/common';
import { User } from '../domain/entities/user.entity';
import { UserRepository } from '../domain/repositories/user.repository';

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) { }
  async execute(id: string): Promise<User | null> {
    // Retrieve the user from the repository using the provided ID
    const user = await this.userRepository.findById(id);

    // You can perform additional business logic here if needed

    return user;
  }
}
