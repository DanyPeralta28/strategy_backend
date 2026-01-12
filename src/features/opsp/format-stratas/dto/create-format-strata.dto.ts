import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  MaxLength,
  IsInt,
  IsArray,
} from 'class-validator';

export class CreateFormatStrataDto {
  @ApiProperty({ example: 'Scalingsoft' })
  @IsString()
  @MaxLength(50)
  id_company: string;

  @ApiProperty({ example: 'Entity001', required: false })
  @IsString()
  @MaxLength(50)
  id_entity?: string;

  @ApiProperty({ example: 'En mis palabras: brindamos soluciones integrales.' })
  @IsString()
  @MaxLength(1000)
  @IsOptional()
  own_words?: string;

  @ApiProperty({ example: 'Consultoría estratégica, formación ejecutiva.' })
  @IsString()
  @MaxLength(1000)
  @IsOptional()
  products_and_services?: string;

  @ApiProperty({ example: 'Guatemala, Honduras y El Salvador.' })
  @IsString()
  @MaxLength(500)
  @IsOptional()
  geographic_area?: string;

  @ApiProperty({ example: 'Devolución si no se cumplen los tiempos.' })
  @IsString()
  @MaxLength(1000)
  @IsOptional()
  brand_promise_guarantee?: string;

  @ApiProperty({ example: 'Simplificamos la transformación empresarial.' })
  @IsString()
  @MaxLength(1000)
  @IsOptional()
  strategy_one_liner?: string;

  @ApiProperty({
    type: 'array',
    example: [
      { title: 'Capacitación exclusiva a socios', value: 'Mensual' },
      { title: 'Auditorías semestrales de valor', value: 'Incluido' },
      { title: '', value: '' },
      { title: '', value: '' },
    ],
  })
  @IsArray()
  @IsOptional()
  diff_acitivities?: any[];

  @ApiProperty({ example: 'Expertise sectorial consolidado' })
  @IsString()
  @MaxLength(1000)
  @IsOptional()
  factor_x_advantage?: string;

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
