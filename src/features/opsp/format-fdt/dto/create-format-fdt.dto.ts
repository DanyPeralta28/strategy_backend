import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  MaxLength,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateFormatFdtDto {
  /* --- Clave de compañía --- */
  @ApiProperty({ example: 'Scalingsoft', description: 'Company identifier' })
  @IsString()
  @MaxLength(50)
  id_company: string;

  /* --- Tendencias globales --- */
  @ApiProperty({
    description: 'Global trends affecting the company',
    type: 'array',
    example: [
      { trend: 'Digital transformation', impact: 'High' },
      { trend: 'Sustainability', impact: 'Medium' },
    ],
  })
  @IsArray()
  @ArrayNotEmpty()
  global_trends_impact: any[];

  /* --- Fortalezas --- */
  @ApiProperty({
    description: 'Core strengths identified in the company',
    type: 'array',
    example: [
      { strength: 'Brand reputation', importance: 'High' },
      { strength: 'Customer loyalty', importance: 'Medium' },
    ],
  })
  @IsArray()
  @ArrayNotEmpty()
  core_strengths: any[];

  /* --- Debilidades --- */
  @ApiProperty({
    description: 'Core weaknesses that limit performance',
    type: 'array',
    example: [
      { weakness: 'High turnover', severity: 'High' },
      { weakness: 'Legacy systems', severity: 'Medium' },
    ],
  })
  @IsArray()
  @ArrayNotEmpty()
  core_weaknesses: any[];

  /* --- Estado --- */
  @ApiProperty({ example: 1, description: 'Status of the record' })
  @IsInt()
  status: number;

  /* --- Usuario creador --- */
  @ApiProperty({
    example: 'admin_user',
    description: 'User that created the record',
  })
  @IsString()
  @MaxLength(100)
  created_by: string;
}
