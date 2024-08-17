import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty()
  id!: string
  @ApiProperty()
  email!: string;

  @ApiProperty()
  password!: string;

  @ApiProperty({ /*enum: RoleEnum,*/ default: [], isArray: true })
  roles/*: RoleEnum[]*/ = [];

  @ApiProperty({ required: false, default: true })
  isEnabled?: boolean = true;
}
