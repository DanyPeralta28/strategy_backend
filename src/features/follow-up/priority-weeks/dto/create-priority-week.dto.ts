import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsInt,
  MaxLength,
  IsArray,
} from 'class-validator';

export class CreateFollowUpPriorityWeeksDto {
  @ApiProperty({
    description: 'Lista de prioridades por calidad',
    example: [
      { noWeek: 4, description: 'Entregar informes a tiempo', weight: 5 },
      { noWeek: 8, description: 'Corregir errores detectados', weight: 3 }
    ],
  })
  @IsArray()
  @IsOptional()
  priority_list_quality: any[];

  @ApiProperty({
    description: 'Lista de prioridades por cantidad',
    example: [
      { noWeek: 2, description: 'Alcanzar 100 llamadas', weight: 4 },
      { noWeek: 1, description: 'Visitar 20 clientes', weight: 5 }
    ],
  })
  @IsArray()
  @IsOptional()
  priority_list_quantity: any[];

  @ApiProperty({
    description: 'Lista de KPIs personalizados',
    example: [
      { noWeek: 4, description: 'Incrementar ventas en un 10%', weight: 4 },
      { noWeek: 5, description: 'Reducir tiempos de atención', weight: 3 }
    ],
  })
  @IsArray()
  @IsOptional()
  kpi_list: any[];

  @ApiProperty({ example: '100%', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  game_green_kpi?: string;

  @ApiProperty({ example: '90%', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  game_lemon_kpi?: string;

  @ApiProperty({ example: '80%', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  game_yellow_kpi?: string;

  @ApiProperty({ example: '60%', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  game_red_kpi?: string;

  @ApiProperty({ example: '87%', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  game_result_kpi?: string;

  @ApiProperty({ example: 'yellow', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  game_color_kpi?: string;

  @ApiProperty({ example: 'Meta cumplida', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  game_green_priority?: string;

  @ApiProperty({ example: 'Casi cumplida', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  game_lemon_priority?: string;

  @ApiProperty({ example: 'Pendiente de mejora', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  game_yellow_priority?: string;

  @ApiProperty({ example: 'No cumplida', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  game_red_priority?: string;

  @ApiProperty({ example: 'Pendiente de mejora', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  game_result_priority?: string;

  @ApiProperty({ example: 'red', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  game_color_priority?: string;

  @ApiProperty({ example: 'BANRURAL_GT', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  id_company?: string;

  @ApiProperty({ example: 'SUCURSAL_001', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  id_entity?: string;

  @ApiProperty({ example: 'marketing', description: 'Team identifier' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  team?: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  status: number;

  @ApiProperty({
    description: 'Usuario creador',
    example: { username: 'admin', role: 'coordinator' },
  })
  @IsOptional()
  created_by: any;
}
