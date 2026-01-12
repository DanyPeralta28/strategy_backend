// dto/create-consistent-action.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, MaxLength, IsArray, ArrayNotEmpty, IsOptional } from 'class-validator';

export class CreateConsistentActionDto {
  @ApiProperty({ example: 'Scalingsoft', description: 'Company identifier' })
  @IsString()
  @MaxLength(50)
  id_company: string;

  @ApiProperty({ example: 'SUCURSAL_001' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  id_entity?: string;

  @ApiProperty({
    description: 'Consistent actions to execute',
    type: 'array',
    example: [
      {
        description: 'Reunión diaria de equipo',
        responsible: 'Juan Pérez',
        kpi: 'On-time start',
      },
      {
        description: 'Revisión semanal de indicadores',
        responsible: 'Ana Gómez',
        kpi: 'KPI cumplimiento',
      },
    ],
  })
  @IsArray()
  action: any[];

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
