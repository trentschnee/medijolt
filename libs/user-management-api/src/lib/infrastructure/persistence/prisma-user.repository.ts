import { PrismaService } from '@medijolt/api/shared';
import { Injectable } from '@nestjs/common';
import { User } from '../../core/domain/entities/user.entity';
import { UserRepository } from '../../core/domain/repositories/user.repository';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) { }

  async save(user: User): Promise<User> {
    return this.prisma.user.upsert({
      where: { id: user.id },
      update: {
        email: user.email,
        password: user.password,
        isEnabled: user.isEnabled,
      },
      create: {
        id: user.id,
        email: user.email,
        password: user.password,
        isEnabled: user.isEnabled,
      },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
