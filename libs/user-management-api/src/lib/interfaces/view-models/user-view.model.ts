import { ApiProperty } from '@nestjs/swagger';

export class UserViewModel {
  @ApiProperty({ example: 'userId1' })
  id!: string;

  @ApiProperty({ example: 'user@example.com' })
  email!: string;

  @ApiProperty({ example: true })
  isEnabled!: boolean;
}
