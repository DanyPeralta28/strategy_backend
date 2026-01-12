import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFormatPurposeDto {
  @ApiProperty({ example: 'Scalingsoft' })
  @IsString()
  @MaxLength(50)
  id_company: string;

  @ApiProperty({ example: 'Entity001', required: false })
  @IsString()
  @MaxLength(50)
  id_entity?: string;

  @ApiProperty({ example: 'Our goal is to expand operations in Central America' })
  @IsString()
  @MaxLength(500)
  purpose_description: string;

  @ApiProperty({ example: 'admin_user' })
  @IsString()
  @MaxLength(100)
  created_by: string;
}
