import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFormatPurposeDto {
  @ApiProperty({ example: 'BANRURAL_GT' })
  @IsString()
  @MaxLength(50)
  id_company: string;

  @ApiProperty({ example: 'Expand into new markets' })
  @IsString()
  @MaxLength(150)
  purpose_title: string;

  @ApiProperty({ example: 'Our goal is to expand operations in Central America' })
  @IsString()
  @MaxLength(500)
  purpose_description: string;

  @ApiProperty({ example: 'admin_user' })
  @IsString()
  @MaxLength(100)
  created_by: string;
}
