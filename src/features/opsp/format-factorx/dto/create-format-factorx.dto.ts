import { IsString, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFormatFactorXDto {
  @ApiProperty({ example: 'Scalingsoft' })
  @IsString()
  id_company: string;

  @ApiProperty({ example: 'Entity001', required: false })
  @IsOptional()
  @IsString()
  id_entity?: string;

  @ApiProperty({
    type: 'array',
    example: [
      { step_order: 1, step_label: 'Recepción', has_inefficiency: true, symbol: '⚠️' },
      { step_order: 2, step_label: 'Evaluación', has_inefficiency: false, symbol: '' },
    ],
  })
  @IsArray()
  process_flow_steps: any[];

  @ApiProperty({
    type: 'array',
    required: false,
    example: [
      { description: 'Demora en presupuesto', leader: 'Laura Gómez', due_date: '2025-07-15' },
    ],
  })
  @IsArray()
  @IsOptional()
  bottleneck_list?: any[];

  @ApiProperty({
    type: 'array',
    required: false,
    example: [
      { name: 'Expo 10X Centroamérica', leader: 'Ana López', date: '2025-08-10' },
    ],
  })
  @IsArray()
  @IsOptional()
  trade_action_list?: any[];

  @ApiProperty({ example: 'admin_user' })
  @IsString()
  created_by: string;
}
