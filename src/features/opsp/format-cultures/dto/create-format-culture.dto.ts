import { IsString, MaxLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFormatCultureDto {
  @ApiProperty({ example: 'Scalingsoft' })
  @IsString()
  @MaxLength(50)
  id_company: string;

  @ApiProperty({ example: 'Entity001', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  id_entity?: string;

  @ApiProperty({ example: 'Innovation Culture' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  culture_name?: string;

  @ApiProperty({
    example: 'We foster innovation through collaborative work and learning.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(5000)
  culture_description?: string;

  @ApiProperty({ example: 'admin_user' })
  @IsString()
  @MaxLength(100)
  created_by: string;
}
