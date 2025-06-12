import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, MaxLength } from 'class-validator';

export class CreateFormatFdtDto {
  @ApiProperty({ example: 'BANRURAL_GT', description: 'Company identifier' })
  @IsString()
  @MaxLength(50)
  id_company: string;

  @ApiProperty({
    example: 'Impacto de tendencias globales...',
    description: 'Global trends affecting the company',
  })
  @IsString()
  @MaxLength(2000)
  global_trends_impact: string;

  @ApiProperty({
    example: 'Fortalezas principales...',
    description: 'Core strengths identified in the company',
  })
  @IsString()
  @MaxLength(2000)
  core_strengths: string;

  @ApiProperty({
    example: 'Debilidades encontradas...',
    description: 'Core weaknesses that limit performance',
  })
  @IsString()
  @MaxLength(2000)
  core_weaknesses: string;

  @ApiProperty({ example: 1, description: 'Status of the record' })
  @IsInt()
  status: number;

  @ApiProperty({
    example: 'admin_user',
    description: 'User that created the record',
  })
  @IsString()
  @MaxLength(100)
  created_by: string;
}
