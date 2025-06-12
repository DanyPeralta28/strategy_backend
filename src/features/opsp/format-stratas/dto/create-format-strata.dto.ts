import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, IsInt } from 'class-validator';

export class CreateFormatStrataDto {
  @ApiProperty({ example: 'BANRURAL_GT' })
  @IsString()
  @MaxLength(50)
  id_company: string;

  @ApiProperty({ example: 'En mis palabras...' })
  @IsString()
  @MaxLength(1000)
  @IsOptional()
  own_words?: string;

  @ApiProperty({ example: 'Clientes que buscan...' })
  @IsString()
  @MaxLength(1000)
  @IsOptional()
  core_client_description?: string;

  @ApiProperty({ example: 'Consultorías, capacitaciones...' })
  @IsString()
  @MaxLength(1000)
  @IsOptional()
  products_and_services?: string;

  @ApiProperty({ example: 'Guatemala, El Salvador...' })
  @IsString()
  @MaxLength(500)
  @IsOptional()
  geographic_area?: string;

  @ApiProperty({ example: 'Promesa 1: ... KPI: ...' })
  @IsString()
  @MaxLength(1000)
  @IsOptional()
  brand_promises_with_kpis?: string;

  @ApiProperty({ example: 'Garantía de satisfacción...' })
  @IsString()
  @MaxLength(1000)
  @IsOptional()
  brand_promise_guarantee?: string;

  @ApiProperty({ example: 'Nos diferenciamos por...' })
  @IsString()
  @MaxLength(1000)
  @IsOptional()
  strategy_one_liner?: string;

  @ApiProperty({ example: 'Actividades distintas...' })
  @IsString()
  @MaxLength(1000)
  @IsOptional()
  diff_acitivities?: string;

  @ApiProperty({ example: 'Ventaja única X' })
  @IsString()
  @MaxLength(1000)
  @IsOptional()
  factor_x_advantage?: string;

  @ApiProperty({ example: 'Utilidad por proyecto' })
  @IsString()
  @MaxLength(500)
  @IsOptional()
  profit_per_x?: string;

  @ApiProperty({ example: 'Ser líderes en LatAm en 2030' })
  @IsString()
  @MaxLength(1000)
  @IsOptional()
  bhag_long_goal?: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsOptional()
  status?: number;

  @ApiProperty({ example: 'admin_user' })
  @IsString()
  @MaxLength(100)
  @IsOptional()
  created_by?: string;
}
