import { IsString, MaxLength, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFormatCompetencyDto {
  @ApiProperty({ example: 'BANRURAL_GT' })
  @IsString()
  @MaxLength(50)
  id_company: string;

  @ApiProperty({ example: 'Customer Service' })
  @IsOptional()
  @IsString()
  @MaxLength(250)
  core_competency?: string;

  @ApiProperty({ example: 'Ability to serve internal and external clients' })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  competency_description?: string;

  @ApiProperty({ example: ['Empathy', 'Active Listening', 'Problem Solving'] })
  @IsOptional()
  @IsArray()
  competencies_list?: string[];

  @ApiProperty({ example: 'admin_user' })
  @IsString()
  @MaxLength(100)
  created_by: string;
}
