import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User, User as UserModel } from '@prisma/client';
import { CreateUserDto } from './create-user-dto';
import { UsersService } from './users.service';
@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(
    @Body() CreateUserDto: CreateUserDto,
  ): Promise<UserModel> {
    const userData = { id: CreateUserDto.id, email: CreateUserDto.email };
    return this.usersService.create(userData);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: Partial<User>): Promise<User> {
    return this.usersService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(id);
  }
}
