import { PrismaService } from '@medijolt/api/shared';
import { Injectable } from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { hash } from 'bcrypt';
import { CreateUserDto } from './create-user-dto';
import { CreateRoleDto } from './create-role-dto';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateUserDto): Promise<User> {
    // Hash the password before saving it
    const hashedPassword = await this._hashData(data.password,);
    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword, // Store the hashed password
        roles: data.roles
          ? {
            create: data.roles.map(roleId => ({
              role: {
                connect: { id: roleId },
              },
            })),
          }
          : undefined,
      },
      include: { roles: { include: { role: true } } },
    });

    // Do not return the password
    const { password, ...result } = user;
    return result;
  }
  async createRole(data: CreateRoleDto): Promise<Role> {
    return this.prisma.role.create({
      data,
    });
  }
  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: { roles: { include: { role: { include: { permissions: true } } } } }
    });
  }

  async findOne(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: { roles: { include: { role: { include: { permissions: true } } } } }
    });
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    // Handle role updates here
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }


  async assignRoleToUser(userId: string, roleId: string): Promise<void> {
    await this.prisma.userRole.create({
      data: { userId, roleId },
    });
  }

  async createPermission(data: Prisma.PermissionCreateInput): Promise<Permission> {
    return this.prisma.permission.create({ data });
  }

  async assignPermissionToRole(roleId: string, permissionId: string): Promise<void> {
    await this.prisma.rolePermission.create({
      data: { roleId, permissionId },
    });
  }
  private _hashData(data: string, hashRounds = 10) {
    return hash(data, hashRounds);
  }
}
