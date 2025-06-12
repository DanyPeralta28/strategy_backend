import { IsString, MaxLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFormatCultureDto {
  @ApiProperty({ example: 'BANRURAL_GT' })
  @IsString()
  @MaxLength(50)
  id_company: string;

  @ApiProperty({ example: 'Innovation Culture' })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  culture_name?: string;

  @ApiProperty({
    example: 'We foster innovation through collaborative work and learning.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  culture_description?: string;

  @ApiProperty({ example: 'admin_user' })
  @IsString()
  @MaxLength(100)
  created_by: string;
}
