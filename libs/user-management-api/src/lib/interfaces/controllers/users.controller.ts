import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserUseCase } from '../../core/use-cases/create-user.use-case';
import { GetUserUseCase } from '../../core/use-cases/get-user.use-case';
import { CreateUserDto } from '../dtos/create-user.dto';
import { toUserViewModel } from '../mappers/to-user-view.model';
import { UserViewModel } from '../view-models/user-view.model';



@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
  ) { }
  @Get()
  async getAllUsers(): Promise<UserViewModel[]> {
    // const users = await this.getUserUseCase.execute();
    return [];
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserViewModel> {
    const user = await this.createUserUseCase.execute(createUserDto);
    return toUserViewModel(user);
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserViewModel> {
    const user = await this.getUserUseCase.execute(id);
    if (!user) {
      throw new Error('User not found');
    }
    return toUserViewModel(user);
  }
}
