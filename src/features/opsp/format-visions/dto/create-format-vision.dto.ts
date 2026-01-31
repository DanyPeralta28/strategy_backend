import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsInt,
  MaxLength,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreateFormatVisionDto {
  @ApiProperty({ example: 'Integrity, Innovation' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  core_values: string;

  @ApiProperty({ example: 'Delivering exceptional value' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(250)
  brand_promises: string;

  @ApiProperty({ example: 'jdoe' })
  @IsString()
  @MaxLength(100)
  user_name: string;

  @ApiProperty({
    type: 'array',
    example: [
      { kpi: 'Client satisfaction', meta: '90%' },
      { kpi: 'Lead conversion rate', meta: '15%' },
    ],
  })
  @IsArray()
  kpi_list: any[];

  @ApiProperty({
    type: 'array',
    example: [
      {
        prioridad: 'Expand into new markets',
        plazo: '2025-01-01 00:00:00',
        esOKR: true,
        subprioridades: ['Open branch in Costa Rica', 'Establish logistics'],
      },
      {
        prioridad: 'Improve UX',
        plazo: '2025-09-30 00:00:00',
        esOKR: false,
        subprioridades: ['Mobile redesign', 'A/B testing'],
      },
    ],
  })
  @IsArray()
  priority_list: any[];

  @ApiProperty({ example: 'Everything on track' })
  @IsString()
  @MaxLength(100)
  game_green_1: string;

  @ApiProperty({ example: 'Minor risks detected' })
  @IsString()
  @MaxLength(100)
  game_lemon_1: string;

  @ApiProperty({ example: 'Delays in delivery' })
  @IsString()
  @MaxLength(100)
  game_yellow_1: string;

  @ApiProperty({ example: 'Critical risk identified' })
  @IsString()
  @MaxLength(100)
  game_red_1: string;

  @ApiProperty({ example: '90% KPIs met' })
  @IsString()
  @MaxLength(100)
  game_green_2: string;

  @ApiProperty({ example: '70-90% KPIs met' })
  @IsString()
  @MaxLength(100)
  game_lemon_2: string;

  @ApiProperty({ example: '50-70% KPIs met' })
  @IsString()
  @MaxLength(100)
  game_yellow_2: string;

  @ApiProperty({ example: '<50% KPIs met' })
  @IsString()
  @MaxLength(100)
  game_red_2: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  status: number;

  @ApiProperty({ example: '13474' })
  @IsString()
  @MaxLength(100)
  created_by: string;

  @ApiProperty({ example: '1' })
  @IsString()
  @MaxLength(50)
  id_company: string;

  @ApiProperty({ example: '1', required: false })
  @IsString()
  @MaxLength(50)
  id_entity?: string;

  @ApiProperty({
    description: 'Vision blocks structured by period',
    type: 'array',
    example: [
      {
        key: 'threeFiveYears',
        values: [
          { titulo: 'BHAG', value: 'Be the #1 provider in Central America' },
          { titulo: 'Market presence', value: '5 countries' },
        ],
      },
      {
        key: 'year',
        values: [
          { titulo: 'Annual focus', value: 'Optimize operations' },
        ],
      },
      {
        key: 'trimesterOne',
        values: [
          { titulo: 'Campaign Q1', value: 'Launch loyalty program' },
        ],
      },
    ],
  })
  @IsArray()
  visionData: any[];
}
