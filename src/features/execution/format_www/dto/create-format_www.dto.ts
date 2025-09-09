import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MaxLength, IsInt, IsDateString } from 'class-validator';

export class CreateFormatWwwDto {
  @ApiProperty({ example: 'Scalingsoft' })
  @IsString()
  @MaxLength(50)
  id_company: string;

  @ApiProperty({ example: 'Actualizar catálogo de productos' })
  @IsOptional()
  @IsString()
  @MaxLength(250)
  what?: string;

  @ApiProperty({ example: 'María López' })
  @IsOptional()
  @IsString()
  @MaxLength(250)
  who?: string;

  @ApiProperty({ example: '2025-09-15', description: 'YYYY-MM-DD' })
  @IsOptional()
  @IsDateString()
  when?: string;

  @ApiProperty({ example: 'En progreso' })
  @IsOptional()
  @IsString()
  @MaxLength(250)
  www_status?: string;

  @ApiProperty({ example: '2025-09-30', description: 'YYYY-MM-DD' })
  @IsOptional()
  @IsDateString()
  new_when?: string;

  @ApiProperty({ example: '13474', description: 'id_user como string o username según tu estándar' })
  @IsString()
  @MaxLength(100)
  created_by: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  status: number;
}
