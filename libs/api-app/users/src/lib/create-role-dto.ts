import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'CustomRole' })
  @IsString()
  name!: string;

  @ApiProperty({
    type: [String],
    example: ['create_patient', 'view_lab_results'],
    required: false,
  })
  @IsArray()
  @IsOptional()
  permissions?: string[];
}
