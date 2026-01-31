// dto/create-cash-format-iel.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, MaxLength, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateCashFormatIelDto {
  @ApiProperty({ example: '1', description: 'Company identifier' })
  @IsString()
  @MaxLength(50)
  id_company: string;

  @ApiProperty({
    description: 'List of retail periods',
    type: 'array',
    example: [
      {
        year: '2025',
        revenue: 20,
        cogs: 40,
        grossMargin: 10,
        directLabor: 23,
      },
    ],
  })
  @IsArray()
  @ArrayNotEmpty()
  periods_list: any[];

  @ApiProperty({
    description: 'List of impact items',
    type: 'array',
    example: [
      {
        label: 'Incremento (%) de integrantes tipo “A” (del Equipo con Talento)',
        rank: 12,
      },
      {
        label: 'Fortalecer las disciplinas de Ejecución (Prioridades, Métricas, Comunicación)',
        rank: 12,
      },
      {
        label:
          'Optimizar el Desempeño del Producto (Perfeccionar la Promesa de Marca / Indicadores clave de rendimiento)',
        rank: 10,
      },
    ],
  })
  @IsArray()
  @ArrayNotEmpty()
  impact_items_list: any[];

  @ApiProperty({ example: 1, description: 'Status of the record' })
  @IsInt()
  status: number;

  @ApiProperty({ example: '13474', description: 'User that created the record' })
  @IsString()
  @MaxLength(100)
  created_by: string;
}
