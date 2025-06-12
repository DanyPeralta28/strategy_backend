import { IsString, IsDateString, IsObject, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFormatFactorXDto {
  @ApiProperty({ example: 'BANRURAL_GT', description: 'Company identifier' })
  @IsString()
  id_company: string;

  @ApiProperty({
    example: [
      {
        step_order: 1,
        step_label: 'INICIO',
        has_inefficiency: false,
        symbol: '',
      },
      {
        step_order: 2,
        step_label: 'Recepción',
        has_inefficiency: true,
        symbol: 'simbolo',
      },
    ],
    description: 'List of 12 step objects representing the process flow',
    type: Array,
  })
  @IsArray()
  process_flow_steps: any[];

  @ApiProperty({
    example: 'Falta de insumos en área A',
    description: 'First bottleneck description',
  })
  @IsString()
  bottleneck_1_description: string;

  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Leader for first bottleneck',
  })
  @IsString()
  bottleneck_1_leader: string;

  @ApiProperty({
    example: '2025-07-01',
    description: 'Due date for first bottleneck',
  })
  @IsDateString()
  bottleneck_1_due_date: string;

  @ApiProperty({
    example: 'Demora en aprobación de presupuesto',
    description: 'Second bottleneck description',
  })
  @IsString()
  bottleneck_2_description: string;

  @ApiProperty({
    example: 'Laura Gómez',
    description: 'Leader for second bottleneck',
  })
  @IsString()
  bottleneck_2_leader: string;

  @ApiProperty({
    example: '2025-07-15',
    description: 'Due date for second bottleneck',
  })
  @IsDateString()
  bottleneck_2_due_date: string;

  @ApiProperty({
    example: 'Falla en logística de entrega',
    description: 'Third bottleneck description',
  })
  @IsString()
  bottleneck_3_description: string;

  @ApiProperty({
    example: 'Carlos Mendoza',
    description: 'Leader for third bottleneck',
  })
  @IsString()
  bottleneck_3_leader: string;

  @ApiProperty({
    example: '2025-07-30',
    description: 'Due date for third bottleneck',
  })
  @IsDateString()
  bottleneck_3_due_date: string;

  @ApiProperty({
    example: 'Expo 10X Centroamérica',
    description: 'Trade show or fair name',
  })
  @IsString()
  trade_show_name: string;

  @ApiProperty({
    example: 'Ana López',
    description: 'Leader for the trade show action',
  })
  @IsString()
  trade_show_leader: string;

  @ApiProperty({
    example: '2025-08-10',
    description: 'Date for trade show action',
  })
  @IsDateString()
  trade_show_date: string;

  @ApiProperty({
    example: 'admin_user',
    description: 'User who created the record',
  })
  @IsString()
  created_by: string;
}
