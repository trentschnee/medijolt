import { MedijoltApiSharedModule } from '@medijolt/api/shared';
import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './core/use-cases/create-user.use-case';
import { GetUserUseCase } from './core/use-cases/get-user.use-case';
import { PrismaUserRepository } from './infrastructure/persistence/prisma-user.repository';
import { UsersController } from './interfaces/controllers/users.controller';

@Module({
  imports: [MedijoltApiSharedModule],
  controllers: [UsersController],
  providers: [
    PrismaUserRepository,
    {
      provide: 'UserRepository',
      useClass: PrismaUserRepository,
    },
    CreateUserUseCase,
    GetUserUseCase, // Ensure this use case is provided
  ],
  exports: [
    PrismaUserRepository,
    CreateUserUseCase,
    GetUserUseCase,
  ],
})
export class UserManagementModule { }
